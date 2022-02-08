
/*
 * An "object" representing a 3d vector to make operations simple and concise.
 *
 * Similar to how we work with plain numbers, we will work with vectors as
 * an entity unto itself.  Note the syntax below: var Vector3 = function...
 * This is different than you might be used to in most programming languages.
 * Here, the function is meant to be instantiated rather than called and the
 * instantiation process IS similar to other object oriented languages => new Vector3()
 */

var Vector3 = function(x, y, z) {
  
  if (x == undefined)
  {
    x=0; 
  }
  if (y == undefined)
  {
    y=0; 
  }
  if (z == undefined)
  {
    z=0; 
  }
  this.x = x; this.y = y; this.z = z;

  // Sanity check to prevent accidentally using this as a normal function call
  if (!(this instanceof Vector3)) {
    console.error("Vector3 constructor must be called with the 'new' operator");
  }

  // todo - make sure to set a default value in case x, y, or z is not passed in
}

Vector3.prototype = {

  //----------------------------------------------------------------------------- 
  set: function(x, y, z) {
    // todo set 'this' object's values to those from x, y, and z
    this.x = x; 
    this.y = y; 
    this.z = z; 
    return this;
  },

  //----------------------------------------------------------------------------- 
  clone: function() {

    return new Vector3(this.x, this.y, this.z);
  },

  //----------------------------------------------------------------------------- 
  copy: function(other) {
    // copy the values from other into 'this'
    this.x = other.x; 
    this.y = other.y; 
    this.z = other.z; 
    return this;
  },

  //----------------------------------------------------------------------------- 
  negate: function() {
    // multiply 'this' vector by -1
    // This SHOULD change the values of this.x, this.y, and this.z
    this.x = this.x * -1; 
    this.y = this.y * -1; 
    this.z = this.z * -1; 
    return this;
  },

  //----------------------------------------------------------------------------- 
  add: function(v) {
    // todo - add v to 'this' vector
    // This SHOULD change the values of this.x, this.y, and this.z
    this.x += v.x;
    this.y += v.y; 
    this.z += v.z
    return this;
  },

  //----------------------------------------------------------------------------- 
  subtract: function(v) {
    // todo - subtract v from 'this' vector
    // This SHOULD change the values of this.x, this.y, and this.z
    this.x -= v.x; 
    this.y -= v.y; 
    this.z -= v.z; 
    return this;
  },

  //----------------------------------------------------------------------------- 
  multiplyScalar: function(scalar) {
    // multiply 'this' vector by "scalar"
    // This SHOULD change the values of this.x, this.y, and this.z
    this.x = this.x * scalar; 
    this.y = this.y * scalar; 
    this.z = this.z * scalar;
    return this;
  },

  //----------------------------------------------------------------------------- 
  length: function() {
    // todo - return the magnitude (A.K.A. length) of 'this' vector
    // This should NOT change the values of this.x, this.y, and this.z
  
    return Math.sqrt((this.x * this.x)+ (this.y * this.y)+ (this.z * this.z));
  },

  //----------------------------------------------------------------------------- 
  lengthSqr: function() {
    // todo - return the squared magnitude of this vector ||v||^2
    // This should NOT change the values of this.x, this.y, and this.z

    // There are many occasions where knowing the exact length is unnecessary 
    // and the square can be substituted instead (for performance reasons).  
    // This function should not have to take the square root of anything.
    var length = Math.sqrt((this.x * this.x)+ (this.y * this.y)+ (this.z * this.z));
    return length*length;
  },

  //----------------------------------------------------------------------------- 
  normalize: function() {
    // todo - Change the components of this vector so that its magnitude will equal 1.
    // This SHOULD change the values of this.x, this.y, and this.z
    var length = Math.sqrt((this.x * this.x)+ (this.y * this.y)+ (this.z * this.z));
    this.x = this.x / length; 
    this.y = this.y / length; 
    this.z = this.z / length; 
    return this;
  },

  //----------------------------------------------------------------------------- 
  dot: function(other) {
    // todo - return the dot product betweent this vector and "other"
    // This should NOT change the values of this.x, this.y, and this.z
    var dot = ((this.x * other.x) + (this.y * other.y) + (this.z * other.z))
    return dot;
  },


  //============================================================================= 
  // The functions below must be completed in order to receive an "A"

  //----------------------------------------------------------------------------- 
  fromTo: function(fromPoint, toPoint) {
    if (!(fromPoint instanceof Vector3) || !(toPoint instanceof Vector3)) {
      console.error("fromTo requires to vectors: 'from' and 'to'");
    }
    var newvector = new Vector3(toPoint.x-fromPoint.x, toPoint.y-fromPoint.y, toPoint.z-fromPoint.z);
    return newvector; 
    // todo - return the vector that goes from "fromPoint" to "toPoint"
    //        NOTE - "fromPoint" and "toPoint" should not be altered
  },

  //----------------------------------------------------------------------------- 
  project: function(vectorToProject, otherVector) {
    // todo - return a vector that points in the same direction as "otherVector"
    //        but whose length is the projection of "vectorToProject" onto "otherVector"
    //        NOTE - "vectorToProject" and "otherVector" should NOT be altered (i.e. use clone)
    //        See class slides or visit https://en.wikipedia.org/wiki/Vector_projection for more detail.

    var newvector1 = vectorToProject.clone; 
    var newvector2 = otherVector.clone; 

    var dot = ((newvector1.x * newvector2.x) + (newvector1.y * newvector2.y) + (newvector1.z * newvector2.z))

    var proj = dot/ newvector2.length

    var vector3 = new vector3((newvector2.x*proj), (newvector2.y * proj), (newvector2.z * proj))
    
    return vector3; 


  }
};
