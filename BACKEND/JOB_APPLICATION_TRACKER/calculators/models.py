from django.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone

class Calculators(models.Model):
    """
    Model to store two numbers and perform a selected arithmetic operation.
    """

    OPERATION_CHOICES = [
        ('ADD', '+'),
        ('SUB', '-'),
        ('MUL', '×'),
        ('DIV', '÷'),
        ('FLOOR', '//'),   
        ('MOD', '%'),
    ]

    number1 = models.FloatField(help_text="Enter the first number")
    number2 = models.FloatField(help_text="Enter the second number")
    operation = models.CharField(
        max_length=5,  # increase length to fit 'FLOOR'
        choices=OPERATION_CHOICES,
        default='ADD',
        help_text="Select the operation to perform"
    )
    result = models.FloatField(blank=True, null=True, editable=False)
    created_at = models.DateField(default=timezone.now)  # Only date

    def save(self, *args, **kwargs):
        """Calculate result based on selected operation."""
        if self.operation == 'ADD':
            self.result = self.number1 + self.number2
        elif self.operation == 'SUB':
            self.result = self.number1 - self.number2
        elif self.operation == 'MUL':
            self.result = self.number1 * self.number2
        elif self.operation == 'DIV':
            if self.number2 == 0:
                raise ValidationError("Cannot divide by zero!")
            self.result = self.number1 / self.number2
        elif self.operation == 'FLOOR':
            if self.number2 == 0:
                raise ValidationError("Cannot perform floor division by zero!")
            self.result = self.number1 // self.number2
        elif self.operation == 'MOD':
            if self.number2 == 0:
                raise ValidationError("Cannot perform modulo by zero!")
            self.result = self.number1 % self.number2
        else:
            raise ValidationError("Invalid operation selected!")

        super().save(*args, **kwargs)

    def __str__(self):
        op_symbol = dict(self.OPERATION_CHOICES).get(self.operation)
        return f"{self.number1} {op_symbol} {self.number2} = {self.result}"
