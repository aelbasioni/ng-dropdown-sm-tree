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

Then start using the new control, given that there are two arrays; one for the parent items, and the other for the child items (i.e. `Departments` and `Department Subjects`):

Refer to [index.html](https://github.com/aelbasioni/ng-dropdown-sm-tree/blob/master/index.html); the demo page of the package

```html
    <ng-Dropdownsmtree ng-model="selectedSubject" parent-array="departments" parent-array-item-id-field="ID" parent-array-item-display-field="Description"
                        child-arrays="departmentSubjects" child-arrays-item-parent-id="DepartmentID" child-arrays-item-display-field="Description"
                        child-arrays-item-search-field="Description" control-class="form-control bordered-control" search-placeholder="Search"
                        title-placeholder="Select Subject" disabled="false"></ng-Dropdownsmtree>


```

#### Description of attributes


| Attribute | Description |Required | Binding | Example |
|-----------| ------------|---------|---------|---------|
| ng-model | It's an object for holding the selected result |Yes |  | selectedSubject |
| parent-array | It's an array of objects of the parent items in the tree |No | = | departments |
| child-arrays | It's an array of objects of the child items altogether |No | = | departmentSubjects |
| parent-array-item-id-field | The unique _id_ field name of the parent objects |Yes | @ | "ID" |
| child-arrays-item-parent-id | The _parent id_ field name of the child objects |Yes | @ | "DepartmentID" |
| parent-array-item-display-field | The parent item field used to be displayed in the tree | No | @ | "Description" |
| child-arrays-item-display-field | The child item field used to be displayed in the tree | No | @ | "Description" |
| child-arrays-item-search-field | The field name used in searching within the child objects |Yes | @ | "Description" |
| search-placeholder | To be used in the search box placeholder |No | @ | "Search" |
| title-placeholder | The test that will be first displayed in the control as a guide for the user |No | @ | "Select Subject" |
| control-class | A CSS class(s) for the displayed control |Required | Binding | "form-control bordered-control" |
| disabled | Define if the interaction with the control is enabled or disabled |No | @ | true/false |


## Contribution

Here's how to [contribute](https://github.com/aelbasioni/ng-dropdown-sm-tree/blob/master/CONTRIBUTING.md). Giving a star is also a contribution ;)

## License

The content of this repository is licensed under [MIT license](https://github.com/aelbasioni/ng-dropdown-sm-tree/blob/master/LICENSE.md)


