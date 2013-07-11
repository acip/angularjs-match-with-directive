Angularjs matchWith Directive
==============================

Angularjs match with validator (passwords or any other input) directive.

Special feature: adjusts validation when editing the matchWith element too

Usage example:
```html
<form name="myForm">
    <input type="text" name="password">
    <input type="text" name="passwordRepeat" match-with="myForm.passwordRepeat">
</form>
```
