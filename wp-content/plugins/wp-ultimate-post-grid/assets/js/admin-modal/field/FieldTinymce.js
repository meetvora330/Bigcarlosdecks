import React, { Component } from 'react';

import Loader from 'Shared/Loader';

let editor_uid = 0;

export default class FieldTinymce extends Component {
    constructor(props) {
        super(props);

        // Make sure each render gets a unique UID.
        const uid = editor_uid;
        editor_uid = uid + 1;

        this.state = {
            editorHtml: false,
            addedListeners: false,
            editorId: `wpupg-admin-modal-tinymce-${uid}`,
        }

        this.initEditor = this.initEditor.bind(this);
        this.initTinyMCE = this.initTinyMCE.bind(this);
    }

    componentDidMount() {
        const editor = document.getElementById( 'wpupg-admin-modal-tinymce-placeholder' );
        let editorHtml = editor.innerHTML;
        editorHtml = editorHtml.replace( /wpupg-admin-modal-tinymce/g, this.state.editorId );

        this.setState({
            editorHtml,
        });
    }

    componentDidUpdate( prevProps, prevState ) {
        if ( this.state.editorHtml && ! prevState.editorHtml ) {
            this.initEditor();
        }
    }

    initEditor() {
        if ( typeof window.tinymce !== 'undefined' ) {
            this.initTinyMCE();
        } else {
            this.initTextarea();
        }
    }

    initTextarea() {
        const textarea = document.getElementById( this.state.editorId );

        if ( typeof window.quicktags !== 'undefined' ) {
            window.quicktags( { id: this.state.editorId } );
        }

        if ( textarea ) {
            textarea.value = this.props.value;

            ['input', 'blur'].forEach((event) => {
                textarea.addEventListener(event, () => {
                    this.props.onChange( textarea.value );
                });
            });
        }
    }

    initTinyMCE() {
        // Clean up first.
        const container = document.getElementById( `wp-${this.state.editorId}-editor-container` );
        container.outerHTML = `<textarea id="${this.state.editorId}"></textarea>`;

        const $wrap = tinymce.$( `#wp-${this.state.editorId}-wrap` );

        // Force to text mode and init.
        $wrap.removeClass( 'tmce-active' ).addClass( 'html-active' );
        this.initTextarea();

        // Force to visual mode and init.
        $wrap.removeClass( 'html-active' ).addClass( 'tmce-active' );

        let args = {};
        if ( typeof window.tinyMCEPreInit !== 'undefined' && tinyMCEPreInit.hasOwnProperty('mceInit') && tinyMCEPreInit.mceInit.hasOwnProperty('wpupg-admin-modal-tinymce') ) {
            args = tinyMCEPreInit.mceInit['wpupg-admin-modal-tinymce'];
        }
        if ( args.hasOwnProperty('body_class') ) {
            args.body_class = args.body_class.replace( /wpupg-admin-modal-tinymce/g, this.state.editorId );
        }
        args.selector = `#${this.state.editorId}`;

        window.tinymce.init( args );

        // Attach listener.
        const editor = window.tinymce.get(this.state.editorId);

        if ( editor ) {
            editor.on('change', () => {
                this.props.onChange( editor.getContent() );
            });
        }
    }
  
    componentWillUnmount() {
        if ( typeof window.tinyMCE !== 'undefined' ) {
            window.tinyMCE.remove(`#${this.state.editorId}`);
        }
    }
  
    render() {
        if ( ! this.state.editorHtml ) {
            return <Loader/>;
        }

        return (
            <div
                className="wpupg-admin-modal-field-tinymce-container"
                dangerouslySetInnerHTML={ { __html: this.state.editorHtml } }
            />
        );
    }
}
