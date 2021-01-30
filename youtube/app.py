from flask import Flask,Response,jsonify
from flask import request
from youtube_transcript_api import YouTubeTranscriptApi
import json
from transformers import T5Tokenizer, T5ForConditionalGeneration, T5Config
import datetime
import urllib3 as u
import urllib.parse
#from urllib import unquote
#from urllib3.parse import urlparse
#from urlparse import parse_qs, urlparse

# define a variable to hold you app
app = Flask(__name__)

# define your resource endpoints


@app.route('/api/summarize', methods=['GET'])
def get_summarize():
    youtube_url=request.args.get('youtube_url')
    #youtube_url="https://www.youtube.com/watch?v=dP15zlyra3c"
    url_data = urllib.parse.urlparse(youtube_url)
    query = urllib.parse.parse_qs(url_data.query)
    videoid = query["v"][0]
    print(videoid)
    #video_id = parse_qs(urlparse(youtube_url).query)['v'][0]
    text=parse(str(videoid))
    summary=summarize(text)
    data = {'responseText': summary}
    return jsonify(data),200


def parse(videoid):
    parsedContent=''
    result=YouTubeTranscriptApi.get_transcript(videoid)
    print(result[0]['text'])

    #result_list = []#json.load(result)
    #print(result_list)
    for data in result:
        parsedContent+=data['text']+" "

    print(parsedContent)
    return parsedContent

def summarize(text):
    model = T5ForConditionalGeneration.from_pretrained("t5-base")
    tokenizer = T5Tokenizer.from_pretrained("t5-base")
    # encode the text into tensor of integers using the appropriate tokenizer
    inputs = tokenizer.encode("summarize: " + text, return_tensors="pt", max_length=512, truncation=True)
    outputs = model.generate(inputs,
                             max_length=150,
                             min_length=40,
                             length_penalty=2.0,
                             num_beams=4,
                             no_repeat_ngram_size=2,
                             num_return_sequences=4,
                             early_stopping=True)
    # just for debugging
    #print(outputs)
    print(tokenizer.decode(outputs[0]))
    return tokenizer.decode(outputs[0])



# server the app when this file is run
if __name__ == '__main__':
    app.run()
