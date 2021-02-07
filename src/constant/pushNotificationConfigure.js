import PushNotification from 'react-native-push-notification'

const pushNotificationConfigure = () => {
    PushNotification.createChannel(
        {
            channelId: "channel-id",
            channelName: "Task Today",
            channelDescription: "A channel to categorise your notifications",
            playSound: false,
            soundName: "default",
            importance: 4,
            vibrate: true,
        },
        (created) => console.log(`createChannel returned '${created}'`)
    );

    PushNotification.configure({
        onNotification: function (notification) {
            console.log('LOCAL NOTIFICATION ==>', notification)
        },
        popInitialNotification: true,
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },
        requestPermissions: Platform.OS === 'ios',
    })
}


export default pushNotificationConfigure