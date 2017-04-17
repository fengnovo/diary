import Simditor from 'simditor'

(function (root, factory) {
  if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"),require("simditor"));
  } else {
    root['SimditorMark'] = factory(jQuery,Simditor);
  }
}(this, function ($, Simditor) {

var SimditorMark,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SimditorMark = (function(superClass) {
  extend(SimditorMark, superClass);

  function SimditorMark() {
    return SimditorMark.__super__.constructor.apply(this, arguments);
  }

  SimditorMark.prototype.name = 'mark';

  SimditorMark.prototype.icon = 'mark';

  SimditorMark.prototype.htmlTag = 'mark';

  SimditorMark.prototype.disableTag = 'pre, table';

  SimditorMark.prototype.command = function() {
    var $end, $start, range;
    range = this.editor.selection.range();
    if (this.active) {
      this.editor.selection.save();
      this.unmark(range);
      this.editor.selection.restore();
      this.editor.trigger('valuechanged');
      return;
    }
    if (range.collapsed) {
      return;
    }
    this.editor.selection.save();
    $start = $(range.startContainer);
    $end = $(range.endContainer);
    if ($start.closest('mark').length) {
      range.setStartBefore($start.closest('mark')[0]);
    }
    if ($end.closest('mark').length) {
      range.setEndAfter($end.closest('mark')[0]);
    }
    this.mark(range);
    this.editor.selection.restore();
    this.editor.trigger('valuechanged');
    if (this.editor.util.support.onselectionchange) {
      return this.editor.trigger('selectionchanged');
    }
  };

  SimditorMark.prototype.mark = function(range) {
    var $contents, $mark;
    if (range == null) {
      range = this.editor.selection.range();
    }
    $contents = $(range.extractContents());
    $contents.find('mark').each(function(index, ele) {
      return $(ele).replaceWith($(ele).html());
    });
    $mark = $('<mark>').append($contents);
    return range.insertNode($mark[0]);
  };

  SimditorMark.prototype.unmark = function(range) {
    var $mark;
    if (range == null) {
      range = this.editor.selection.range();
    }
    if (range.collapsed) {
      $mark = $(range.commonAncestorContainer);
      if (!$mark.is('mark')) {
        $mark = $mark.parent();
      }
    } else if ($(range.startContainer).closest('mark').length) {
      $mark = $(range.startContainer).closest('mark');
    } else if ($(range.endContainer).closest('mark').length) {
      $mark = $(range.endContainer).closest('mark');
    }
    return $mark.replaceWith($mark.html());
  };

  return SimditorMark;

})(Simditor.Button);

Simditor.Toolbar.addButton(SimditorMark);

return SimditorMark;

}));
