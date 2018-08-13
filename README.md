# ng-dropdownsmtree

This is an angularJS directive that extends the functionality of [Twitter Bootstrap Dropdown control](https://getbootstrap.com/docs/3.3/components/#dropdowns) to show 2 level trees. It's more convenient for small trees to select one sub-item.

To see a demo, check: [https://aelbasioni.github.io/ng-dropdown-sm-tree/](https://aelbasioni.github.io/ng-dropdown-sm-tree/)

## 1. Getting started

### → Manual Install

#### Step1

You must have AngularJS library included for this directive to work: [Download from here](https://angularjs.org/)

#### Step2

You need to include the libraries needed by [Twitter Bootstrap Dropdown control](https://getbootstrap.com/docs/3.3/components/#dropdowns):

- [Jquery](https://developers.google.com/speed/libraries/#jquery)
before the body closing tag `</body>`
- Then [Bootstrap js](http://getbootstrap.com/docs/3.3/getting-started/#download)
- And [Bootstrap css](http://getbootstrap.com/docs/3.3/getting-started/#download) in the `<head></head>` section

#### step3

Download the package, and include the **dist/ng-dropdownsmtree.min.js** file in your page after the previous js libraries, And include **dist/ng-dropdownsmtree.min.css** in the `<head></head>` section

#### Step4

Add the **ngDropdownsmtree** module to your Angular App file, e.g.
```
var app = angular.module('app', ["ngDropdownsmtree"]);
```

#### Step 5

Then start using the new control as in the project demo


## Contribution

Here's how to [contribute](https://github.com/aelbasioni/ng-dropdown-sm-tree/blob/master/CONTRIBUTING.md). Giving a star is also a contribution ;)

## License

The content of this repository is licensed under [MIT license](https://github.com/aelbasioni/ng-dropdown-sm-tree/blob/master/LICENSE.md)