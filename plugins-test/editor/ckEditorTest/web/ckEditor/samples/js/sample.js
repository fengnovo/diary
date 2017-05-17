/**
 * Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

/* exported initSample */

if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )
	CKEDITOR.tools.enableHtml5Elements( document );

// The trick to keep the editor in the sample quite small
// unless user specified own height.
CKEDITOR.config.height = 150;
CKEDITOR.config.width = 'auto';
CKEDITOR.on('dialogDefinition', function (ev) {
            var dd = ev.data.definition; 
            if (ev.data.name == 'image') {
                dd.onShow = function () {
                    var dialog = CKEDITOR.dialog.getCurrent();         // make upload default tab        
                    this.selectPage('Upload');        // hide unwanted tab        
                    dialog.hidePage('Link'); 
                    dialog.hidePage('advanced'); 
                    dialog.hidePage('info'); 
                    var uploadTab = dd.getContents('Upload'); 
                    var uploadButton = uploadTab.get('uploadButton'); 
                    uploadButton['filebrowser']['onSelect'] = function (fileUrl, errorMessage) { 
                        dialog.getContentElement('info', 'txtUrl').setValue(fileUrl); 
                        $(".cke_dialog_ui_button_ok span").click(); 
                        // _this.uploadInit();
                    }
                };
            }
        })
var initSample = ( function() {
	var wysiwygareaAvailable = isWysiwygareaAvailable(),
		isBBCodeBuiltIn = !!CKEDITOR.plugins.get( 'bbcode' );

	return function() {
		var editorElement = CKEDITOR.document.getById( 'editor' );

		// :(((
		if ( isBBCodeBuiltIn ) {
			editorElement.setHtml(
				'Hello world!\n\n' +
				'I\'m an instance of [url=http://ckeditor.com]CKEditor[/url].'
			);
		}

		// Depending on the wysiwygare plugin availability initialize classic or inline editor.
		if ( wysiwygareaAvailable ) {
			CKEDITOR.replace( 'editor' );
		} else {
			editorElement.setAttribute( 'contenteditable', 'true' );
			CKEDITOR.inline( 'editor' );

			// TODO we can consider displaying some info box that
			// without wysiwygarea the classic editor may not work.
		}
	};

	function isWysiwygareaAvailable() {
		// If in development mode, then the wysiwygarea must be available.
		// Split REV into two strings so builder does not replace it :D.
		if ( CKEDITOR.revision == ( '%RE' + 'V%' ) ) {
			return true;
		}

		return !!CKEDITOR.plugins.get( 'wysiwygarea' );
	}
} )();

