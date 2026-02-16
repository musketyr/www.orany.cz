---
title: "How to Reduce Code in Grails Controllers to Minimum"
date: 2019-09-05
slug: how-to-reduce-code-in-grails-controllers-to-minimum
source: medium
mediumId: "254a99510e82"
---The controllers in any web framework should reduce their code to the bare minimum which only bridges web input and output into…

* * *

### How to Reduce Code in Grails Controllers to Minimum

![](https://cdn-images-1.medium.com/max/800/1*FX1KhedNbPqtAgoPrjvJpw.png)

The controllers in any web framework should reduce their code to the bare minimum which only bridges web input and output into platform-independent business code. The problem arises when you have a code with different outcomes which you would like to represent with different HTTP status codes.

Typical examples are security and parameter checks like the following:

*   Is the endpoint authorized properly?
*   Are some of the parameters missing?
*   Does the referred item exist?

Following `CommentController` shows some of the problems. Usually, there is even more code between the method's points of return.

**class** CommentController {  
  
    **def securityService  
    def commentService  
  
    def** updateComment(String id, String newText) {  
        **if** (!**securityService**.authorized(request)) {  
            respond **status**: HttpStatus.**_FORBIDDEN_            return**        }  
  
        **if** (!**securityService**.hasRole(request, **'EDITOR'**)) {  
            respond **status**: HttpStatus.**_UNAUTHORIZED_            return**        }  
  
        **if** (!id || !newText) {  
            respond **status**: HttpStatus.**_BAD\_REQUEST_            return**        }  
  
        Comment comment = **commentService**.findById(id)  
  
        **if** (!comment) {  
            respond **status**: HttpStatus.**_NOT\_FOUND_            return**        }  
  
        comment = **commentService**.updateComment(comment, newText)  
  
        render(comment **as** JSON)  
    }  
  
}

To reduce the code we need to adopt multiple approaches. Typically security and similar cross-cutting concerns are best handled with aspect-oriented programming style which means using interceptors in the Grails environment.

**class** SecurityInterceptor {  
  
    **def** **securityService**    SecurityInterceptor() {  
        _// just for demo, usually you would use annotations  
        // or some name conventions_        match(**controller**: **'comment'**, **action**: **'updateComment'**)  
        _// more actions_    }  
  
    **boolean** before() {  
        **if** (!securityService.authorized(request)) {  
            respond **status**: HttpStatus.**_FORBIDDEN_            return false**        }  
  
        **if** (!securityService.hasRole(request, **'EDITOR'**)) {  
            respond **status**: HttpStatus.**_UNAUTHORIZED_            return false**        }  
        **return true**  
    }  
  
    **boolean** after() {  
        **return true**    }  
      
}

See [Interceptors](http://docs.grails.org/latest/guide/theWebLayer.html#interceptors) for further reference.

For exceptional states, there are exceptions in Java. You can move the code into the service and throw exceptions at the points where would you normally return from the controller action:

**class** CommentService {  
  
    **def commentService**    Comment updateComment(String id, String newText) {  
        _// moved to interceptor_        **if** (!id || !newText) {  
            **throw new** IllegalArgumentException(**"Details..."**)  
        }  
  
        Comment comment = findById(id)  
  
        **if** (!comment) {  
            **throw new** NoSuchElementException(**"Details..."**)  
        }  
  
        **return** updateComment(comment, newText)  
    }  
}

The controller will handle the exceptions in an exception handling actions:

**class** CommentController {  
  
    **def commentService  
  
    def** updateComment(String id, String newText) {  
        render(**commentService**.updateComment(id, newText) **as** JSON)  
    }  
  
    **def** handleWrongParmeters(IllegalArgumentException e) {  
        respond **status**: HttpStatus.**_BAD\_REQUEST_**    }  
  
    **def** handleMissingComment(NoSuchElementException e) {  
        respond **status**: HttpStatus.**_NOT\_FOUND_**    }  
      
}

See [Declarative Controller Exception Handling](http://docs.grails.org/latest/guide/theWebLayer.html#controllerExceptionHandling) for further reference.

* * *
By [Vladimír Oraný](https://medium.com/@musketyr) on [September 5, 2019](https://medium.com/p/254a99510e82).

[Canonical link](https://medium.com/@musketyr/how-to-reduce-code-in-grails-controllers-to-minimum-254a99510e82)

Exported from [Medium](https://medium.com) on February 15, 2026.