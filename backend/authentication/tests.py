from django.test import TestCase
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from .models import UserSettings
from django.utils import timezone

User = get_user_model()

class UserAccountManagerTests(TestCase):
    def test_create_user(self):
        user = User.objects.create_user(
            email='test@example.com',
            password='testpass123',
            first_name='Test',
            last_name='User'
        )
        self.assertEqual(user.email, 'test@example.com')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_superuser(self):
        admin_user = User.objects.create_superuser(
            email='admin@example.com',
            password='adminpass123',
            first_name='Admin',
            last_name='User'
        )
        self.assertEqual(admin_user.email, 'admin@example.com')
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)

    def test_create_user_without_email(self):
        with self.assertRaises(ValueError):
            User.objects.create_user(email='', password='testpass123')

class UserAccountTests(TestCase):
    def test_user_str_representation(self):
        user = User.objects.create_user(
            email='test@example.com',
            password='testpass123',
            first_name='Test',
            last_name='User'
        )
        self.assertEqual(str(user), 'test@example.com')

class UserSettingsTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123',
            first_name='Test',
            last_name='User'
        )
        self.user_settings = UserSettings.objects.create(
            user=self.user,
            company_name='Test Company',
            company_address='123 Test St',
            company_phone='1234567890',
            umbrella_count=5,
            gps_coordinates=[40.7128, -74.0060],
            opening_time=timezone.now().time(),
            closing_time=timezone.now().time()
        )

    def test_user_settings_str_representation(self):
        self.assertEqual(str(self.user_settings), f"Settings for {self.user.email}")

    def test_user_settings_fields(self):
        self.assertEqual(self.user_settings.company_name, 'Test Company')
        self.assertEqual(self.user_settings.company_address, '123 Test St')
        self.assertEqual(self.user_settings.company_phone, '1234567890')
        self.assertEqual(self.user_settings.umbrella_count, 5)
        self.assertEqual(self.user_settings.gps_coordinates, [40.7128, -74.0060])
        self.assertIsNotNone(self.user_settings.opening_time)
        self.assertIsNotNone(self.user_settings.closing_time)

    def test_user_settings_one_to_one_relationship(self):
        self.assertEqual(self.user.settings, self.user_settings)