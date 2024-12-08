# Generated by Django 5.1.4 on 2024-12-06 16:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event_manager', '0009_customuser_admin_access'),
    ]

    operations = [
        migrations.CreateModel(
            name='Score',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone', models.CharField(max_length=15)),
                ('points', models.PositiveIntegerField()),
            ],
        ),
        migrations.AlterField(
            model_name='step',
            name='number',
            field=models.PositiveIntegerField(verbose_name='Номер задачи'),
        ),
    ]