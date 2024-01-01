import sys
sys.path.append('/opt/render/.local/lib/python3.7')

from pytube import YouTube
import os
import sys

def youtubedownload(video_id):
    try:
        yt = YouTube(f"https://youtube.com/watch?v={video_id}")
        video = yt.streams.filter(only_audio=True).first()
        new_file = f"music/{video_id}.mp3"
        video.download(filename=new_file)
        print(f"Downloaded: {new_file}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python youtube_downloader.py <video_id>")
        sys.exit(1)
    else:
        video_id = sys.argv[1]
        youtubedownload(video_id)
        
