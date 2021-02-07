
import PushNotification from 'react-native-push-notification'

const pushNotificationSchedule = (chanelName, id ,bigText ,message, date) => {
  PushNotification.localNotificationSchedule({
      channelId: chanelName,
      bigText: bigText,
      message: message, 
      date: date,
      allowWhileIdle: true,
      data: {
         id: id
      }
   });
}

export default pushNotificationSchedule
