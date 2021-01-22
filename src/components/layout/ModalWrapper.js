import React from 'react'
import {Modal as ModalWrap } from 'react-native'
import { Modal, Portal, Provider } from 'react-native-paper'
import { apply } from 'osmicsx'


const ModalWrapper = props => {
    return (
        <>
            <ModalWrap
                animationType="fade"
                transparent={true}
                visible={props.visible}
                onRequestClose={props.onDismiss}
            >
                <Provider>
                    <Portal>
                        <Modal visible={props.visible} onDismiss={props.onDismiss} contentContainerStyle={apply("px-4 py-6")}>
                            { props.renderComponent }
                        </Modal>
                    </Portal>
                </Provider>
            </ModalWrap>
        </>
    )
}

export default ModalWrapper
