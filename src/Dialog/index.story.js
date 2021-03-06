import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {StoryWrapper} from './../_lib/storyUtils.js';
import Dialog from './index.js';
import Button from './../Button/index.js';

storiesOf('Dialog', module)
    .add('default', () => (
        <StoryWrapper title="Dialog">
            <Dialog
                isOpen={true}
                title="Hello dialog!"
                onRequestClose={action('onRequestClose')}
                actions={[
                    <Button key="foo">An action button</Button>
                ]}
                isWide
                >
                Hello world
            </Dialog>
        </StoryWrapper>
    ));
