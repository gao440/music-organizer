#uri = 'gs://cloud-samples-data/vision/face/faces.jpeg'
import json
import sys
def detect_faces_uri(uri):
    """Detects faces in the file located in Google Cloud Storage or the web."""
    from google.cloud import vision
    client = vision.ImageAnnotatorClient()
    image = vision.types.Image()
    image.source.image_uri = uri

    response = client.face_detection(image=image)
    faces = response.face_annotations

    # Names of likelihood from google.cloud.vision.enums
    likelihood_name = ('UNKNOWN', 'VERY_UNLIKELY', 'UNLIKELY', 'POSSIBLE',
                       'LIKELY', 'VERY_LIKELY')
    print('Faces:')
    faceDict = {
            'anger': False,
            'joy': False,
            'surprise': False

    }
    for face in faces:
        print('anger: {}'.format(likelihood_name[face.anger_likelihood]))
        print('joy: {}'.format(likelihood_name[face.joy_likelihood]))
        print('surprise: {}'.format(likelihood_name[face.surprise_likelihood]))
        angerLike = (likelihood_name[face.anger_likelihood])
        joyLike = (likelihood_name[face.joy_likelihood])
        surpriseLike = (likelihood_name[face.surprise_likelihood])

        if angerLike == 'LIKELY' or angerLike == 'VERY_LIKELY':
            faceDict['anger'] = True
        if joyLike == 'LIKELY' or joyLike == 'VERY_LIKELY':
            faceDict['joy'] = True
        if surpriseLike == 'LIKELY' or surpriseLike == 'VERY_LIKELY':
            faceDict['surprise'] = True

    face_json = json.dumps(faceDict)
    print(face_json)
    return(face_json)
detect_faces_uri(sys.argv[1])
