//angular.module( "ngDropdownsmtree", [])
app.directive('ngDropdownsmtree', function ($filter) {
    return {
        // can be used as attribute(A) or element(E)
        restrict: 'AE',
        require: 'ngModel',
        replace:true,
        // declare the directive scope as private 
        scope: {
            childArrays: '=',
            parentArray: '=',
            disabled: '=',
            selectedsubjectdesc: '@'

        },


        // the markup this directive generates
        template: function (iElement, iAttrs) {

            var html = '<div class="btn-group" style="width:100%">' +
                            '<button type="button" class="btn dropdown-toggle form-control ' + iAttrs.controlClass + '" data-ng-class="{\'disabled\':disabled == true}"   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >' +
                                '<i class="glyphicon glyphicon-triangle-bottom pull-right" style="margin-top:3px"></i>' +
                                 '{{selectedsubjectdesc}}' +
                            '</button>            ' +
                            '<ul class="dropdown-menu custom-dropdown-menu" >' +
                                '<li ><input type="text" placeholder="' + iAttrs.searchPlaceholder + '" class="form-control" data-ng-change="highlightContainers($event)" data-ng-model="SearchSubjectFLTR" data-ng-init="SearchSubjectFLTR =\'\'" /></li>' +
                                '<li data-ng-repeat="item in parentArray">' +
                                    '<span  onclick="event.stopPropagation();" data-ng-click="showSecondLevel(item,$event)" ><span class="glyphicon glyphicon-plus"></span> {{item.Description}}</span>' +
                                    '<div class="content" style="margin-left: 14px; overflow: hidden">' +
                                    '<ul style="padding-left: 15px" >' +
                                            '<li data-ng-repeat="sb in childArrays | filter: {'+iAttrs.childArraysItemParentId+': item[\''+ iAttrs.parentArrayItemId+'\']}: true | filter:{Description:SearchSubjectFLTR} ">' +
                                                '<a href="" data-ng-click="setselecteditem(sb)"> {{sb.Description }}</a>' +
                                            '</li>' +
                                        '</ul>' +
                                    '</div>' +
                                '</li>' +

                            '</ul>' +
                        '</div>';

            return html;
        },

        // this function is called on each ng-Twolevelddl instance initialisation
        // we just declare what we need in the above template
        link: function (scope, iElement, iAttrs, ctrl) {

            ctrl.$render = function () {
                if(ctrl.$viewValue)
                  scope.selectedsubjectdesc = ctrl.$viewValue.Description;
                else
                  scope.selectedsubjectdesc = "select item ..."
            };
      
            function doRemoveHighlightContainers(elm) {

                try {
                    for (var i = 0; i < scope.parentArray.length; i++) {
                        elm.find("span").removeClass(iAttrs.highlightedelementclass);                       
                    }

                } catch (e) { }
            };
            scope.highlightContainers = function (event) {


                var elm = $(event.currentTarget || event.srcElement);
                doRemoveHighlightContainers(elm);

                if (scope.SearchSubjectFLTR.length > 0) {
                    var _arr = $filter('filter', 'Description')(scope.childArrays, scope.SearchSubjectFLTR);
                    for (var i = 0; i < _arr.length; i++) {
                        if (_arr[i][DepartmentID] == null)
                            $("#" + _divID + " > span").addClass(iAttrs.highlightedelementclass);
                        else
                            $("#" + _divID + _arr[i].DepartmentID + " > span").addClass(iAttrs.highlightedelementclass);
                    }
                }
            };

            scope.showSecondLevel = function (dept, event) {

                //var indexID = dept.DepartmentID;
                //if (indexID == null)
                //    indexID = "";
                //alert
                //var clickedItem = angular.element((event.currentTarget || event.srcElement)).closest('li');
                var clickedItem = $(event.currentTarget || event.srcElement).closest('li');
                clickedItem.find('.content').slideToggle(500);
                clickedItem.find('.glyphicon').toggleClass('glyphicon-plus glyphicon-minus');

            };

            scope.setselecteditem = function (sb) {
                ctrl.$setViewValue(sb);
                ctrl.$render();
            };




        }


    };
});


