from allauth.account.adapter import DefaultAccountAdapter
from allauth.exceptions import ImmediateHttpResponse
from allauth.utils import build_absolute_uri
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from rest_framework import response, status


class AccountAdapter(DefaultAccountAdapter):
    @staticmethod
    def login(request, user):
        raise ImmediateHttpResponse("OK")

    @staticmethod
    def respond_email_verification_sent(request, user):
        return response.Response(
            {"detail": "Email verification sent"}, status=status.HTTP_200_OK
        )

    def stash_verified_email(self, request, email):
        pass

    def unstash_verified_email(self, request):
        pass

    def stash_user(self, request, user):
        pass

    def unstash_user(self, request):
        pass

    @staticmethod
    def get_email_confirmation_url(request, emailconfirmation):
        url = reverse("account_confirm_email")
        ret = build_absolute_uri(request, url)
        return ret

    @staticmethod
    def get_email_confirmation_url_frontend(request, current_site, key):
        return f"{request.scheme}://{current_site.domain}/auth/verify-email/{key}"

    def add_message(
        self, request, level, message_template, message_context=None, extra_tags=None
    ):
        pass

    def send_mail(self, template_prefix, email, context):
        msg = self.render_mail(template_prefix, email, context)
        msg.send()

    def send_confirmation_mail(self, request, emailconfirmation, signup):
        current_site = get_current_site(request)
        activate_url = self.get_email_confirmation_url(request, emailconfirmation)
        activate_url_frontend = self.get_email_confirmation_url_frontend(
            request, current_site, emailconfirmation.key
        )
        ctx = {
            "user": emailconfirmation.email_address.user,
            "activate_url": activate_url,
            "activate_url_frontend": activate_url_frontend,
            "current_site": current_site,
            "key": emailconfirmation.key,
        }
        if signup:
            email_template = "account/email/email_confirmation_signup"
        else:
            email_template = "account/email/email_confirmation"
        self.send_mail(email_template, emailconfirmation.email_address.email, ctx)

    def save_user(self, request, user, form, commit=True):
        """
        Saves a new `User` instance using information provided in the
        signup form.
        """
        from allauth.account.utils import user_email, user_field, user_username

        data = form.cleaned_data
        full_name = data.get("full_name")
        email = data.get("email")
        username = data.get("username")
        user_email(user, email)
        user_username(user, username)
        if full_name:
            user_field(user, "full_name", full_name)
        if "password1" in data:
            user.set_password(data["password1"])
        else:
            user.set_unusable_password()
        self.populate_username(request, user)
        if commit:
            # Ability not to commit makes it easier to derive from
            # this adapter by adding
            user.save()
        return user
