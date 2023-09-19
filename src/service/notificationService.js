import { API } from './base.js'


export const getMyNotifications = async(userId) => {
	try{
		const {data} = await API.get(`/notification/getUser/${userId}`)
		console.log( "Geting Notifies ..",data )
		return data.response

	}catch(error){
		return error
	}	
}


export const markOneNotification = async(notificationId, userId) => {
	try{
		const {data} = await API.post('/notification/markAsRead',{notificationId,userId})
		console.log(" Mark Read ..",data)
		return data.response

	}catch(error){
		return error
	}	
}

export const markAllNotification = async(userId) => {
	try{
		const {data} = await API.post('/notification/markAllAsRead',{userId})
		console.log(" MarkALL Read ..",data)
		return data.response

	}catch(error){
		return error
	}	
}

export const DeleteNotification = async(notificationId,userId) => {
	try{
		const {data} = await API.post('/notification/deleteOne',{notificationId,userId})
		console.log(" Delete Read ..",data)
		return data.response

	}catch(error){
		return error
	}	
}

