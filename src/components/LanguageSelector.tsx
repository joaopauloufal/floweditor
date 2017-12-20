import * as React from 'react';
import Select from 'react-select';
import { Languages } from '../flowTypes';

import * as styles from './LanguageSelector.scss';

export interface Language {
    name: string;
    iso: string;
}

export interface LanguageSelectorProps {
    iso: string;
    languages: Languages;
    onChange(language: Language): void;
}

export default class LanguageSelectorComp extends React.PureComponent<LanguageSelectorProps, {}> {
    private options: Language[] = [];

    constructor(props: LanguageSelectorProps) {
        super(props);

        this.options = Object.keys(this.props.languages).map(iso => {
            const name = this.props.languages[iso];
            return {
                name,
                iso
            };
        });
    }

    render() {
        return (
            <div className={`${styles.ele} select-small`}>
                <Select
                    /** Flow */
                    value={this.props.iso}
                    onChange={this.props.onChange}
                    /** LanguageSelector */
                    valueKey="iso"
                    labelKey="name"
                    searchable={false}
                    clearable={false}
                    options={this.options}
                />
            </div>
        );
    }
}
