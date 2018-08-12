'use strict';

angular.module('ngDropdownsmtree', [])
.directive('ngDropdownsmtree', ['$filter', ($filter)=> {
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
        },


        // the markup this directive generates
        template: (iElement, iAttrs) => {

            const html = `<div class="btn-group ng-dropdownsmtree-css">
                            <button type="button" class="btn dropdown-toggle ${iAttrs.controlClass}" data-ng-class="{\'disabled\':disabled == true}"   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                <i class="glyphicon glyphicon-triangle-bottom pull-right" aria-hidden="true"></i>
                                 {{selectedsubjectdesc}}
                            </button>            
                            <ul class="dropdown-menu ng-dropdownsmtree-inner-dropdown-menu" role="tree">
                                <li ><input type="text" placeholder="${iAttrs.searchPlaceholder}" aria-label="${iAttrs.searchPlaceholder}" class="form-control"  ng-change="highlightContainers()" data-ng-model="SearchSubjectFLTR" data-ng-init="SearchSubjectFLTR =\'\'" /></li>
                                <li data-ng-repeat="item in parentArray" onclick="event.stopPropagation();" data-ng-click="showSecondLevel($event)" data-src="{{item[\'${iAttrs.parentArrayItemIdField}\']}}" data-ng-keydown="onEnter($event)" role="treeitem" tabindex="0" aria-expanded="false">
                                    <span><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> {{item[parentArrayItemDisplayField]}}</span>
                                    <ul role="group" class="content">
                                        <li data-ng-repeat="sb in childArrays | filter: {${iAttrs.childArraysItemParentId}: item[\'${iAttrs.parentArrayItemIdField}\']}: true | filter:{${iAttrs.childArraysItemSearchField}:SearchSubjectFLTR} ">
                                            <a href="" data-ng-click="setselecteditem(sb)" role="treeitem" tabindex="-1"> {{sb[childArraysItemDisplayField] }}</a>
                                        </li>
                                    </ul>                                    
                                </li>

                            </ul>
                        </div>`;

            return html;
        },

        // this function is called on each ng-Twolevelddl instance initialisation
        // we just declare what we need in the above template
        link: (scope, iElement, iAttrs, ctrl) => {

            ctrl.$render = () => {
                if(ctrl.$viewValue)
                  scope.selectedsubjectdesc = ctrl.$viewValue.Description;
                else
                  scope.selectedsubjectdesc = scope.titlePlaceholder;
            };
            
            scope.highlightContainers = () => {

                //remove previous heighlights
                const elm = $(iElement).find('ul');
                elm.find(" >li > span.has-data").removeClass('has-data');

                //height the new elements that contains the new search test
                if (scope.SearchSubjectFLTR.length > 0) {
                    const _arr = $filter('filter', scope.childArraysItemSearchField)(scope.childArrays, scope.SearchSubjectFLTR);
                    for (let i = 0; i < _arr.length; i++) {
                        if (_arr[i][iAttrs.childArraysItemParentId] === null)
                            elm.find("[data-src=''] >span").addClass('has-data');                        
                        else
                            elm.find(`[data-src=${_arr[i][iAttrs.childArraysItemParentId]}] >span`).addClass('has-data');
                    }
                }
            };

            scope.showSecondLevel = (event) => {

                const clickedItem = $(event.currentTarget || event.srcElement).closest('li');
                const content = clickedItem.find('.content');
                if(content.css("display") === "none")
                    clickedItem.attr("aria-expanded","false");
                else
                    clickedItem.attr("aria-expanded","true");
                
                content.slideToggle(500);
                clickedItem.find('.glyphicon').toggleClass('glyphicon-plus glyphicon-minus');

            };

            scope.onEnter = (event) =>{
                if(event.keyCode === 13){
                    scope.showSecondLevel(event);
                }
            };
        
            scope.setselecteditem = (sb) => {
                ctrl.$setViewValue(sb);
                ctrl.$render();
            };

        }

    };
}]);


