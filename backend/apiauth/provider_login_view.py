from allauth.socialaccount.providers.facebook.views import \
    FacebookOAuth2Adapter

from .views import SocialLoginView


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
