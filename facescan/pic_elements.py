#uri = 'https://cloud.google.com/vision/docs/images/bicycle_example.png'
import json
import sys
def localize_objects_uri(uri):
    """Localize objects in the image on Google Cloud Storage

    Args:
    uri: The path to the file in Google Cloud Storage (gs://...)
    """
    from google.cloud import vision
    client = vision.ImageAnnotatorClient()

    image = vision.types.Image()
    image.source.image_uri = uri

    objects = client.object_localization(
        image=image).localized_object_annotations

    print('Number of objects found: {}'.format(len(objects)))

    dictObj = {

    }

    for object_ in objects:
        print('\n{} (confidence: {})'.format(object_.name, object_.score))

        dictObj[object_.name] = object_.score

    obj_json = json.dumps(dictObj)
    print(obj_json)
    return(obj_json)
localize_objects_uri(sys.argv[1])
