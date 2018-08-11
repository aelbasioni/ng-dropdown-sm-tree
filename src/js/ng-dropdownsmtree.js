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
            childArraysItemDisplayField: '@',
            parentArrayItemDisplayField: '@',
            childArraysItemSearchField: '@',
            disabled: '=',
            titlePlaceholder: '@'
            //selectedsubjectdesc: '@'
        },


        // the markup this directive generates
        template: function (iElement, iAttrs) {

            var html = '<div class="btn-group" style="width:100%">' +
                            '<button type="button" class="btn dropdown-toggle form-control ' + iAttrs.controlClass + '" data-ng-class="{\'disabled\':disabled == true}"   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >' +
                                '<i class="glyphicon glyphicon-triangle-bottom pull-right" style="margin-top:3px"></i>' +
                                 '{{selectedsubjectdesc}}' +
                            '</button>            ' +
                            '<ul class="dropdown-menu custom-dropdown-menu" >' +
                                '<li ><input type="text" placeholder="' + iAttrs.searchPlaceholder + '" class="form-control"  oninput="highlightContainers(this)" data-ng-model="SearchSubjectFLTR" data-ng-init="SearchSubjectFLTR =\'\'" /></li>' +
                                '<li data-ng-repeat="item in parentArray" data-src="{{item[\''+iAttrs.parentArrayItemIdField+'\']}}">' +
                                    '<span  onclick="event.stopPropagation();" data-ng-click="showSecondLevel($event)" ><span class="glyphicon glyphicon-plus"></span> {{item[parentArrayItemDisplayField]}}</span>' +
                                    '<div class="content" style="margin-left: 14px; overflow: hidden">' +
                                    '<ul style="padding-left: 15px" >' +
                                            '<li data-ng-repeat="sb in childArrays | filter: {'+iAttrs.childArraysItemParentId+': item[\''+ iAttrs.parentArrayItemIdField+'\']}: true | filter:{'+iAttrs.childArraysItemSearchField+':SearchSubjectFLTR} ">' +
                                                '<a href="" data-ng-click="setselecteditem(sb)"> {{sb[childArraysItemDisplayField] }}</a>' +
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
                  scope.selectedsubjectdesc = scope.titlePlaceholder;
            };
      
            highlightContainers = function (event) {

                if(!event)
                    return;
                
                var val = $(event).val();
                
                //remove previous heighlights
                var elm = $(event).closest('ul');
                elm.find(" >li > span.has-data").removeClass('has-data');

                //height the new elements that contains the new search test
                if (val.length > 0) {
                    var _arr = $filter('filter', scope.childArraysItemSearchField)(scope.childArrays, val);
                    console.log("_arr1",_arr)
                    for (var i = 0; i < _arr.length; i++) {
                        if (_arr[i][iAttrs.childArraysItemParentId] === null)
                            elm.find("[data-src=''] >span").addClass('has-data');                        
                        else
                            elm.find("[data-src="+_arr[i][iAttrs.childArraysItemParentId]+"] >span").addClass('has-data');
                    }
                }
            };

            scope.showSecondLevel = function (event) {

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


