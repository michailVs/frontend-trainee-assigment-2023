import React from 'react'
import { Loader, Dimmer } from 'semantic-ui-react'

const IsLoader = () => {
    return (
        <div>
            <Dimmer active inverted>
                <Loader size='large'>Loading</Loader>
            </Dimmer>
        </div>
    )
}
export default IsLoader