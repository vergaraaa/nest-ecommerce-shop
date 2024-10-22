import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { MessagesWsService } from './messages-ws.service';
import { NewMessageDto } from './dto/new-message.dto';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messagesWsService: MessagesWsService) {}

  @WebSocketServer() wss: Server;

  handleConnection(client: Socket) {
    this.messagesWsService.registerClient(client);

    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);

    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, payload: NewMessageDto) {
    // emit just to client
    // client.emit('message-from-server', {
    //   fullname: 'its me',
    //   message: payload.message || 'no message',
    // });

    // emit to all except the client
    // client.broadcast.emit('message-from-server', {
    //   fullname: 'its me',
    //   message: payload.message || 'no message',
    // });

    this.wss.emit('message-from-server', {
      fullname: 'its me',
      message: payload.message || 'no message',
    });
  }
}
