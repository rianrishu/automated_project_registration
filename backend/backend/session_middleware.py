"""
This is a variation of Django default SessionMiddleware middleware
to allow to resolve different cookie name following our own logic.
For e.g., you could set a different cookie name following the
HTTP path. (You could as well do the same with the host and/or referer)
Beware that this has side-effects if you uses
```
CSRF_USE_SESSIONS = True
```
as the CSRF jeton used in the CSRF Middleware may not make the one from
your non-standard session name (ie. when it is different than settings.SESSION_COOKIE_NAME).
"""
import time
from importlib import import_module

from django.conf import settings
from django.contrib.sessions.backends.base import UpdateError
from django.core.exceptions import SuspiciousOperation
from django.utils.cache import patch_vary_headers
from django.utils.deprecation import MiddlewareMixin
from django.utils.http import http_date


def resolve_request_to_session_cookie_name(request):
    # Default Django implementation is to resolve directly to a hard-coded
    # and unique session cookie name for all hosts and referers.
    # return settings.SESSION_COOKIE_NAME
    
    # We'll use the HTTP path to resolve a different cookie name for:
    # - when the Rest API under /api is used;
    # - all other paths.
    if request.path.startsWith("/api"):
      # Your API custom cookie name to defined in settings.
      return settings.SESSION_COOKIE_NAME_API
    # Resolve the default cookie name.
    return settings.SESSION_COOKIE_NAME


class SessionMiddleware(MiddlewareMixin):
    def __init__(self, get_response=None):
        self.get_response = get_response
        engine = import_module(settings.SESSION_ENGINE)
        self.SessionStore = engine.SessionStore

    def process_request(self, request):
        cookie_name = resolve_request_to_session_cookie_name(request)
        session_key = request.COOKIES.get(cookie_name)
        request.session = self.SessionStore(session_key)

    def process_response(self, request, response):
        """
        If request.session was modified, or if the configuration is to save the
        session every time, save the changes and set a session cookie or delete
        the session cookie if the session has been emptied.
        """
        try:
            accessed = request.session.accessed
            modified = request.session.modified
            empty = request.session.is_empty()
        except AttributeError:
            pass
        else:
            # First check if we need to delete this cookie.
            # The session should be deleted only if the session is entirely empty
            cookie_name = resolve_request_to_session_cookie_name(request)
            if cookie_name in request.COOKIES and empty:
                response.delete_cookie(
                    cookie_name,
                    path=settings.SESSION_COOKIE_PATH,
                    domain=settings.SESSION_COOKIE_DOMAIN,
                )
            else:
                if accessed:
                    patch_vary_headers(response, ("Cookie",))
                if (modified or settings.SESSION_SAVE_EVERY_REQUEST) and not empty:
                    if request.session.get_expire_at_browser_close():
                        max_age = None
                        expires = None
                    else:
                        max_age = request.session.get_expiry_age()
                        expires_time = time.time() + max_age
                        expires = http_date(expires_time)
                    # Save the session data and refresh the client cookie.
                    # Skip session save for 500 responses, refs #3881.
                    if response.status_code != 500:
                        try:
                            request.session.save()
                        except UpdateError:
                            raise SuspiciousOperation(
                                "The request's session was deleted before the "
                                "request completed. The user may have logged "
                                "out in a concurrent request, for example."
                            )
                        response.set_cookie(
                            cookie_name,
                            request.session.session_key,
                            max_age=max_age,
                            expires=expires,
                            domain=settings.SESSION_COOKIE_DOMAIN,
                            path=settings.SESSION_COOKIE_PATH,
                            secure=settings.SESSION_COOKIE_SECURE or None,
                            httponly=settings.SESSION_COOKIE_HTTPONLY or None,
                            samesite=settings.SESSION_COOKIE_SAMESITE,
                        )
        return response

        