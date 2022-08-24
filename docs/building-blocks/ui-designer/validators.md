---
sidebar_position: 3
---

# Validators

![](./img/validators.png)

Data validation can be enforced using Validators.

Some Angular default validators are available:

1. [min](https://angular.io/api/forms/Validators#min)
2. [max](https://angular.io/api/forms/Validators#max)
3. [minLength](https://angular.io/api/forms/Validators#minlength)
4. [maxLength](https://angular.io/api/forms/Validators#maxlength)
5. [required](https://angular.io/api/forms/Validators#required)
6. [email](https://angular.io/api/forms/Validators#email)

Other predefined validators are also available:

1. `isSameOrBeforeToday`: validates that a datepicker value is in the pas
2. `isSameOrAfterToday`: validates that a datepicker value is in the future

Form validation is triggered by default when the button set to validate the Form Group is pressed.

It's also possible to build custom validators inside the container application and reference them here by name.

### Predefined validators

#### 1. required

A required validator checks if the value exists.

Important to be used with other validators like a [minlength](validators.md#2.-minlength) one to check if there is no value at all.

![required validator](./img/validators.png)

#### 2. minlength

Checks if the value has a minimum number of characters (no character at all will not trigger this validator so better use it together with a required validator).

![minlength validator](./img/validator_minlength.png)

#### 3. maxlength

Checks if the value has a maximum number of characters (no character at all will not trigger this validator so better used with a required one).

![maxlength validator](./img/validator_maxlength.png)

#### 4. min

Checks if a numeric value is smaller (no character will trigger this validator so better use it with a required one).

![min validator](./img/validator_min.png)

#### 5. max

Checks if a numeric value is smaller (no character will trigger this validator so better use it with a required one).

![max validator](./img/validator_max.png)

#### 6. email

Checks if you entered an email (no character will not trigger this validator so better used with a required one).

![email validator](./img/validator_email.png)

#### 7. pattern

Checks if you entered a string that respects a pattern (in this case, a regex).

![](./img/validator_pattern.png)

#### 8. isSameOrBeforeToday

It can be added to [datepicker](component-types/form-elements/datepicker-form-field.md) fields.

Checks a date is today or in the past (no character will trigger this validator so better use it with a required one).

![isSameOrBeforeToday](./img/validator_issameday.png)

#### 9. isSameOrAfterToday

Checks a date is today or in the past (no character will trigger this validator so better use it with a required one).

![](./img/validator_issamedayafter.png)

### Custom validators

Custom validators can be created by a developer in the web application before you can use them.

Available configurations are:

1. **Validator name -** name provided by the developer to uniquely identify the validator
2. **Type** - sync/ async validator (for more details check [this](https://angular.io/api/forms/AsyncValidator))
3. **Error Message** - The message that will be displayed if the field is not valid
4. **Validator parameters** - if the validator needs inputs to decide if the field is valid or not, you can pass them using this list

**NOTE:** the error that the validator returns **MUST** match the validator name.

![custom validator](./img/validator_custom.png)

For more details about custom validators please check this [link](../../core-components/renderer-sdks/using-the-angular-renderer.md).