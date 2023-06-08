# -*- coding: utf-8 -*-
"""
アプリを生成する
このモジュールを公開するのはapp, serverである。


"""
# 標準ライブラリ
import os

# 外部ライブラリ
from flask import Flask, render_template, jsonify, make_response, redirect, request
from flask_socketio import SocketIO
from flask_cors import CORS, cross_origin
from flasgger import Swagger

# 内部ライブラリ

socketio = SocketIO(cors_allowed_origins="*",
                    manage_session=True, max_http_buffer_size=6000000)


def create_app() -> Flask:
    """
    Create Flask Application Instance
    :return: Flask Application Instance
    """
    app = Flask(
        __name__,
        instance_relative_config=True,
        static_folder="../../ui/dist/static",
        template_folder="../../ui/dist",
    )

    app.title = "nitra"

    socketio.init_app(app, async_mode="gevent")

    cors = CORS(app, resource={r"/*": {"origins": "*"}}, allow_headers=[
        "Content-Type", 
        "Authorization", 
        "Access-Control-Allow-Origin", 
        "Access-Control-Allow-Headers", 
        "cache-control", 
        "Pragma", 
        "Expires", 
        "Cross-Origin-Embedder-Policy", 
        "Cross-Origin-Opener-Policy"],
        supports_credentials=True)

    # Api documentations
    Swagger(app)

    # Register blueprints
    app.register_blueprint(project)
    
    # デフォルトのルート
    @app.route("/<path:path>")
    def main(path):
        return render_template("index.html")


    @app.route("/health")
    def health():
        return jsonify({}, 200)
    return app