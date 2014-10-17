title=Everyday Gaelyk: Find blob file by name
date=2013-03-19
type=post
tags=blog, datastore, blobstore, files
status=published
~~~~~~

Google App Engine has sort of [support for saving files to the blobstore](https://developers.google.com/appengine/docs/java/blobstore/overview#Writing_Files_to_the_Blobstore). [Gaelyk](http://gaelyk.appspot.com) adds some nice [sugar to the files service](http://gaelyk.appspot.com/tutorial/app-engine-shortcuts#file-service). You can easily create file in blobstore using following shortcut:

*Creating file in the blobstore*

    def file = files.createNewBlobFile("text/plain", "hello.txt")
 
    file.withWriter { writer ->
        writer << "some content"
    }

It is very nice that you have to set the content type and the name of the file but neither the content type nor the file
name is used anywhere. If you [serve the file from the blobstore](https://developers.google.com/appengine/docs/java/blobstore/overview#Serving_a_Blob)
the content type doesn't seem to be set to the response and of course you can't find file by its name easily. But it doesn't mean there
is no way how to do it.

Google offers class [BlobInfoFactory](https://developers.google.com/appengine/docs/java/javadoc/com/google/appengine/api/blobstore/BlobInfoFactory)
to query the information about stored blobs but you would have to walk throught all the blobs in your application to find the proper blob.
Luckily, blob information is just plain entity and 
[BlobInfoFactory](https://developers.google.com/appengine/docs/java/javadoc/com/google/appengine/api/blobstore/BlobInfoFactory)
exposes fields `BlobInfoFactory.KIND`, `BlobInfoFactory.CREATION` and `BlobInfoFactory.FILENAME` which can help you find the desired file.

    String name = "hello.txt"
    def files = datastore.execute {
        from BlobInfoFactory.KIND
        where BlobInfoFactory.FILENAME == name
        sort desc by BlobInfoFactory.CREATION
    }
    if(files){
        new BlobKey(files[0].key.name).serve(response)
    } else {
        response.status = 404
        out << "No such file $name"
    }
    
Since the file name isn't guaranteed to be unique, you can get more than one result. Sorting the blob information by its creation time
help you to get the latest file as the first element of returned list. This might be acctually handy if you want to implement very simple and
inefficient version system. You can create new blob key from the name of the entity returned from the query and using this key you can serve
the file to the client.





