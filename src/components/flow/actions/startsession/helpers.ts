import {
  getActionUUID,
  getExpressions,
  getRecipients,
  getRecipientsByAsset
} from 'components/flow/actions/helpers';
import { StartSessionFormState } from 'components/flow/actions/startsession/StartSessionForm';
import { Types } from 'config/interfaces';
import { StartSession } from 'flowTypes';
import { Asset, AssetType } from 'store/flowContext';
import { NodeEditorSettings } from 'store/nodeEditor';

export const initializeForm = (settings: NodeEditorSettings): StartSessionFormState => {
  if (settings.originalAction && settings.originalAction.type === Types.start_session) {
    const action = settings.originalAction as StartSession;

    return {
      recipients: { value: getRecipients(action) },
      flow: {
        value: {
          id: action.flow.uuid,
          name: action.flow.name,
          type: AssetType.Flow
        }
      },
      createContact: action.create_contact,
      valid: true
    };
  }

  return {
    recipients: { value: [] },
    flow: { value: null },
    createContact: false,
    valid: false
  };
};

export const stateToAction = (
  settings: NodeEditorSettings,
  state: StartSessionFormState
): StartSession => {
  const flow: Asset = state.flow.value;

  return {
    legacy_vars: getExpressions(state.recipients.value),
    contacts: getRecipientsByAsset(state.recipients.value, AssetType.Contact),
    groups: getRecipientsByAsset(state.recipients.value, AssetType.Group),
    create_contact: !!state.createContact,
    flow: { name: flow.name, uuid: flow.id },
    type: Types.start_session,
    uuid: getActionUUID(settings, Types.start_session)
  };
};
