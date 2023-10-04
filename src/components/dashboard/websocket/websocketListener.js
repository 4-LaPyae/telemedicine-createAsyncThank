import {socketApi} from '../../../app/hooks';
import {handleWebsocket} from '../features/DashboardAppointmentSlice';
import {handleDashboard} from '../features/DashboardSlice';
import {io} from 'socket.io-client';

const WebSocketListener = (
    dispatch,
    userId,
    doctors,
    appointments
) => {
    const socket = io(socketApi, {
        query: {userId: userId},
        forceNew: true,
        autoConnect: false,
    });

    // WebSocket event listener
    socket.connect();
    socket.on('ForAPOnlineStatus', (data) => {
        const newDoctors = doctors?.data?.map((doctor) => {
            if (doctor?._id === data.userId) {
                return {
                    ...doctor,
                    onlineStatus: data.onlineStatus,
                };
            } else {
                return doctor;
            }
        });

        const newAppointments = appointments?.data?.map((appoint) => {
            if (appoint?.patient._id === data.userId) {
                return {
                    ...appoint,
                    patient: {
                        ...appoint.patient,
                        onlineStatus: data.onlineStatus,
                    },
                };
            } else {
                return appoint;
            }
        });

        dispatch(
            handleDashboard({
                data: newDoctors,
                total: doctors?.total,
            })
        );
        dispatch(
            handleWebsocket({
                data: newAppointments,
                total: appointments?.total,
            })
        );
    });

    return socket;
};

export default WebSocketListener;
