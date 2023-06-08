# coding: utf-8
"""
Abstract::
    -
History::
    - Ver.      Date            Author        History
    -
"""
from app.app import socketio
from flask_socketio import join_room, leave_room, send, emit


@socketio.on('message')
def handle_message(data):
    """新規メーせ処理

    Args:
        data (json): 受信データ
    """
    print('received message: ' + data)
