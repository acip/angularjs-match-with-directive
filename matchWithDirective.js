/*
The MIT License (MIT)

Copyright (c) 2013 <ciprian.amariei@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/**
 * Match with attribute directive.
 * Usage example
 * <form name="myForm">
 *     <input type="text" name="password">
 *     <input type="text" name="passwordRepeat" match-with="myForm.passwordRepeat">
 * </form>
 *
 * Inspired by original ngRequired directive
 */
angular.module('app')
    .directive('matchWith', ['$window',function (window) {
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function(scope, elm, attr, ctrl) {
                if (!ctrl) return;

                var matchWithCtrl = eval('scope.' + attr.matchWith);
                if (!matchWithCtrl) return;

                var validator = function(value) {
                    var isValid = false;

                    //false if none is set
                    if (matchWithCtrl.$viewValue && ctrl.$viewValue) {
                        //user just began writing in here
                        if (window.document.activeElement == elm[0] && ctrl.$viewValue.length < matchWithCtrl.$viewValue.length) {
                            isValid = true;
                        } else {
                            isValid = ctrl.$viewValue == matchWithCtrl.$viewValue;
                        }
                    }

                    ctrl.$setValidity('matchWith', isValid);

                    return value;
                };

                [ctrl, matchWithCtrl].forEach(function(c) {
                    c.$formatters.push(validator);
                    c.$parsers.unshift(validator);
                });

                attr.$observe('matchWith', function() {
                    validator(ctrl.$viewValue);
                });
            }
        };
}]);