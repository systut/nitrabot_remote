# coding: utf-8
"""

Abstract::
    - 
History::
    - Ver.      Date            Author        History
    - 

"""
# 標準ライブラリ

# 関連外部ライブラリư
# Need these imports for socketio
from flask_socketio import SocketIO
import sockets

# 内部ライブラリ
from app.app import create_app, socketio

# インスタンス
app = create_app()


if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', port=5000)