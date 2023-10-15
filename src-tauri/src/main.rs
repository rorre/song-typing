// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use axum::{
    http::{HeaderValue, Method},
    Router,
};
use tower_http::{cors::CorsLayer, services::ServeDir};

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let mut songs_dir = match app.path_resolver().resource_dir() {
                None => panic!("cannot get resource dir"),
                Some(path) => path,
            };
            songs_dir.push("songs");

            tauri::async_runtime::spawn(async move {
                let songs_dir_str = songs_dir.as_path().to_str().unwrap();
                let serve_dir = ServeDir::new(songs_dir_str);

                let axum_app = Router::new().nest_service("/", serve_dir).layer(
                    CorsLayer::new()
                        .allow_origin("*".parse::<HeaderValue>().unwrap())
                        .allow_methods([Method::GET]),
                );
                axum::Server::bind(&"127.0.0.1:17270".parse().unwrap())
                    .serve(axum_app.into_make_service())
                    .await
                    .unwrap();
            });

            Ok(())
        })
        .plugin(tauri_plugin_sql::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
