/**
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */
var navigation = {
  // navigation object
  o:{},

  // navigation information, ex. selector
  nav: {
    id: '#local-navigation'
  },

  // class
  cs: {
    leaf: 'leaf',
    expand: 'fi-arrows-expand',
    collapse: 'fi-arrows-compress',
    close: 'fi-x-circle'
  },

  // text value
  text: {
    expand: 'Expand All',
    collapse: 'Collapse All',
    close: 'Close Menu'
  },

  // toolbar information
  toolbar: {
    id: 'navToolBar',
    position: 'top',
    o: {}
  },

  // mobile toolbar information
  mobileToolbar: {
    sel: '.toggle-topbar a'
  },

  // buttons information
  buttons: {
    collapse: 'collapseBtn',
    expand: 'expandBtn',
    close: 'closeBtn'
  },

  // tell is the navigation is collapsed in mobile view
  collapsed: true,

  // animation transition speed
  transitionSpeed: 100,

  // traverse the navigation and add required semantic
  traverse: function () {

    var self = this;

    this.o.find('li').each(function (index) {
      var span = {}, span2 = {};

      $(this).attr('role', 'treeitem');

      // collapsible
      if ($(this).find('ul').length) {

        // create span for icone
        span = $("<span/>").html(' ');
        span.addClass(self.cs.leaf);
        span.on('click', function() {
          $(this).parent().toggleClass('active').toggleClass('collapsed');
        });

        $(this).prepend(span);
      }

      //topichead
      $(this).children('.navtitle').on('click', function() {
         $(this).parent().toggleClass('active').toggleClass('collapsed');
      });
    });
  },

  addToolbar: function () {
    this.toolbar.o = $('<div />').attr('id', this.toolbar.id).attr('class', 'toolbar hide-on-small' + this.toolbar.position)
    this.o.prepend(this.toolbar.o);
  },

  addButtons: function () {
    var self = this,
    expandIco = $("<span/>").attr("class", this.cs.expand),
    collapseIco = $("<span/>").attr("class", this.cs.collapse),
    closeIco = $("<span/>").attr("class", this.cs.close),
    expand = $("<span/>").attr("class", "hidden").html(this.text.expand),
    collapse = $("<span/>").attr("class", "hidden").html(this.text.collapse),
    close = $("<span/>").attr("class", "hidden").html(this.text.close),
    btnExpand = $("<button/>").attr('id', this.buttons.expand),
    btnCollapse = $("<button/>").attr('id', this.buttons.collapse).hide(),
    btnClose= $("<button/>").attr('id', this.buttons.close);

    btnExpand.append(expandIco);
    btnExpand.append(expand);
    btnExpand.on('click tap',
     function(){
        self.o.find('li').addClass('active').removeClass('collapsed').attr('aria-expanded', 'true');
           $(this).hide();
           $('#'+self.buttons.collapse).show();
        }
    );

    btnCollapse.append(collapse);
    btnCollapse.append(collapseIco);
    btnCollapse.click(function(){
      o.select();
      self.o.find('li')
        .removeClass('selected')
        .removeClass('active')
        .addClass('collapsed')
        .removeAttr('aria-expanded');
         o.select();
         $(this).hide();
         $('#'+self.buttons.expand).show();
    });

    btnClose.attr('class', 'show-on-small right').append(closeIco).append(close).on('click tap',
      function(){
        self.menuCollapse();
    });

    $('#'+this.toolbar.id).append(btnExpand);
    $('#'+this.toolbar.id).append(btnCollapse);
    $('#'+this.toolbar.id).append(btnClose);
  },

    setButtonClickEvt: function ()
    {
      var self = this;
      $(this.mobileToolbar.sel).on('click', function(){
        if(self.collapsed)
        {
          self.o.animate(
            {
              left: 0
            },
            this.transitionSpeed,
            function()
            {
              self.collapsed = false;
            }
          );
        }
      });
    },

    setCloseEvt: function ()
    {
      var self = this;
      $(document).on('mouseup tap', function (e)
      {
        if (!self.o.is(e.target) // if the target of the click isn't the container...
          && self.o.has(e.target).length === 0
          && !self.collapsed) // ... nor a descendant of the container
        {
           self.menuCollapse();
           self.collapsed = true;
        }
    });
  },

  menuCollapse: function()
  {
    var self = this;
    this.o.animate(
      {
        left: '-100%'
      },
      this.transitionSpeed,
      function() {
        self.collapsed = true;
      }
    );
  },


  init: function () {
    this.o = $(this.nav.id);
    this.o.children('ul').attr('role', 'tree');
    this.o.find('ul').attr('role', 'group');

    this.traverse();
    this.addToolbar();
    this.addButtons();
    this.setButtonClickEvt();
    this.setCloseEvt();
  }
};

$(function() {
  navigation.init();
});

