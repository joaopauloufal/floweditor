import * as React from 'react';
import {Renderer} from '../Renderer'
import * as Interfaces from '../../interfaces';
var Select2 = require('react-select2-wrapper');

export class SetLanguage extends Renderer {

    props: Interfaces.SetLanguageProps;

    renderNode(): JSX.Element {
        return <div>Not implemented</div>
    }

    renderForm(): JSX.Element {
        return <div>Not implemented</div>
    }

    submit(form: Element): void {
        
    }
}

export default SetLanguage;