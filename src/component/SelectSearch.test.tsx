import * as React from 'react';
import { mount } from 'enzyme';
import SelectSearch, { SelectSearchProps } from './SelectSearch';
import { SearchResult } from '../services/ComponentMap';
import { GROUP_PLACEHOLDER, GROUP_NOT_FOUND } from './form/constants';

const { endpoints } = require('../../assets/config');

describe('SelectSearch >', () => {
    describe('render >', () => {
        describe('split by group membership >', () => {
            const props: SelectSearchProps = {
                url: endpoints.groups,
                name: 'Group',
                resultType: 'group',
                placeholder: GROUP_PLACEHOLDER,
                searchPromptText: GROUP_NOT_FOUND,
                closeOnSelect: false,
                initial: []
            };

            const loadOptionsSpy = jest.spyOn(SelectSearch.prototype, 'loadOptions' as any);

            const wrapper = mount(<SelectSearch {...props} />);

            it('should render <Async />, pass it expected props', () => {
                expect(wrapper.find('Async').props()).toEqual(
                    expect.objectContaining({
                        name: props.name,
                        placeholder: props.placeholder,
                        searchPromptText: props.searchPromptText,
                        closeOnSelect: props.closeOnSelect
                    })
                );

                expect(loadOptionsSpy).toHaveBeenCalled();
            });
        });
    });
});
