/*
 * An object representing a 4x4 matrix
 */

var Matrix4 = function(x, y, z) {
	this.elements = new Float32Array(16);

	if (!(this instanceof Matrix4)) {
		console.error("Matrix4 constructor must be called with the new operator");
	}

	return this.makeIdentity();
}

//=============================================================================  
Matrix4.prototype = {

	// -------------------------------------------------------------------------
	clone: function() {
		var newMatrix = new Matrix4();
		for (var i = 0; i < 16; ++i) {
			newMatrix.elements[i] = this.elements[i];
		}
		return newMatrix;
	},

	// -------------------------------------------------------------------------
	copy: function(m) {
		for (var i = 0; i < 16; ++i) {
			this.elements[i] = m.elements[i];
		}

		return this;
	},

	// -------------------------------------------------------------------------
	getElement: function(row, col) {
		return this.elements[row * 4 + col];
	},

	// -------------------------------------------------------------------------
	set: function(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
		var e = this.elements;

		e[0] = n11; e[1] = n12; e[2] = n13; e[3] = n14;
		e[4] = n21; e[5] = n22; e[6] = n23; e[7] = n24;
		e[8] = n31; e[9] = n32; e[10] = n33; e[11] = n34;
		e[12] = n41; e[13] = n42; e[14] = n43; e[15] = n44;

		return this;
	},

	// -------------------------------------------------------------------------
	makeIdentity: function() {
		// todo make this matrix be the identity matrix
		var e = this.elements;

		e[0] = 1; e[1] = 0; e[2] = 0; e[3] = 0;
		e[4] = 0; e[5] = 1; e[6] = 0; e[7] = 0;
		e[8] = 0; e[9] = 0; e[10] = 1; e[11] = 0;
		e[12] = 0; e[13] = 0; e[14] = 0; e[15] = 1;

		return this;
	},

	// -------------------------------------------------------------------------
	multiplyScalar: function(s) {
		for (var i = 0; i < 16; ++i) {
			this.elements[i] = this.elements[i] * s;
		}
	},

	// -------------------------------------------------------------------------
	multiplyVector: function(v) {
		// safety check
		if (!(v instanceof Vector4)) {
			console.error("Trying to multiply a 4x4 matrix with an invalid vector value");
		}

		var result = new Vector4();
		var e = this.elements;
		// todo
		// set the result vector values to be the result of multiplying the
		// vector v by 'this' matrix
		result.x = (e[0]*v.x) +  (e[1]*v.y) + (e[2]*v.z) + (e[3]*v.w); 
		result.y = (e[4]*v.x) +  (e[5]*v.y) + (e[6]*v.z) + (e[7]*v.w);
		result.z = (e[8]*v.x) +  (e[9]*v.y) + (e[10]*v.z) + (e[11]*v.w);
		result.w = (e[12]*v.x) +  (e[13]*v.y) + (e[14]*v.z) + (e[15]*v.w);

		return result;
	},

	// -------------------------------------------------------------------------
	multiply: function(rightSideMatrix) {
		// safety check
		if (!(rightSideMatrix instanceof Matrix4)) {
			console.error("Trying to multiply a 4x4 matrix with an invalid matrix value");
		}

		// todo - multiply 'this' * rightSideMatrix
		var e = this.elements;
		var f = rightSideMatrix.elements;

		var end = this.clone().elements;

		end[0] = (e[0]*f[0]) + (e[1]*f[4]) + (e[2]*f[8]) + (e[3]*f[12]); 
		end[1] = (e[0]*f[1]) + (e[1]*f[5]) + (e[2]*f[9]) + (e[3]*f[13]); 
		end[2] = (e[0]*f[2]) + (e[1]*f[6]) + (e[2]*f[10]) + (e[3]*f[14]); 
		end[3] = (e[0]*f[3]) + (e[1]*f[7]) + (e[2]*f[11]) + (e[3]*f[15]);

		end[4] = (e[4]*f[0]) + (e[5]*f[4]) + (e[6]*f[8]) + (e[7]*f[12]); 
		end[5] = (e[4]*f[1]) + (e[5]*f[5]) + (e[6]*f[9]) + (e[7]*f[13]); 
		end[6] = (e[4]*f[2]) + (e[5]*f[6]) + (e[6]*f[10]) + (e[7]*f[14]); 
		end[7] = (e[4]*f[3]) + (e[5]*f[7]) + (e[6]*f[11]) + (e[7]*f[15]);

		end[8] = (e[8]*f[0]) + (e[9]*f[4]) + (e[10]*f[8]) + (e[11]*f[12]); 
		end[9] = (e[8]*f[1]) + (e[9]*f[5]) + (e[10]*f[9]) + (e[11]*f[13]); 
		end[10] = (e[8]*f[2]) + (e[9]*f[6]) + (e[10]*f[10]) + (e[11]*f[14]); 
		end[11] = (e[8]*f[3]) + (e[9]*f[7]) + (e[10]*f[11]) + (e[11]*f[15]);

		end[12] = (e[12]*f[0]) + (e[13]*f[4]) + (e[14]*f[8]) + (e[15]*f[12]); 
		end[13] = (e[12]*f[1]) + (e[13]*f[5]) + (e[14]*f[9]) + (e[15]*f[13]); 
		end[14] = (e[12]*f[2]) + (e[13]*f[6]) + (e[14]*f[10]) + (e[15]*f[14]); 
		end[15] = (e[12]*f[3]) + (e[13]*f[7]) + (e[14]*f[11]) + (e[15]*f[15]);
		
		this.set(end[0],end[1],end[2],end[3],end[4],end[5],end[6],end[7],end[8],end[9],end[10],end[11],end[12],end[13],end[14],end[15]);

		return this;
	},

	// -------------------------------------------------------------------------
	premultiply: function(leftSideMatrix) {
		// ignore this, the implementation will be distributed with the solution
		return this;
	},

	// -------------------------------------------------------------------------
	makeScale: function(x, y, z) {
		// todo make this matrix into a pure scale matrix based on (x, y, z)
		var e = this.elements;

		e[0] = x; e[1] = 0; e[2] = 0; e[3] = 0;
		e[4] = 0; e[5] = y; e[6] = 0; e[7] = 0;
		e[8] = 0; e[9] = 0; e[10] = z; e[11] = 0;
		e[12] = 0; e[13] = 0; e[14] = 0; e[15] = 1;

		return this;
	},

	// -------------------------------------------------------------------------
	makeRotationX: function(degrees) {
		// todo - convert to radians
		var radians = degrees * (Math.PI/180);

		// shortcut - use in place of this.elements
		var e = this.elements;

		// todo - set every element of this matrix to be a rotation around the x-axis
		e[0] = 1; e[1] = 0; e[2] = 0; e[3] = 0;
		e[4] = 0; e[5] = Math.cos(radians); e[6] = -Math.sin(radians); e[7] = 0;
		e[8] = 0; e[9] = Math.sin(radians); e[10] = Math.cos(radians); e[11] = 0;
		e[12] = 0; e[13] = 0; e[14] = 0; e[15] = 1;

		return this;
	},

	// -------------------------------------------------------------------------
	makeRotationY: function(degrees) {
		// todo - convert to radians
		var radians = degrees * (Math.PI/180);

		// shortcut - use in place of this.elements
		var e = this.elements;

		// todo - set every element of this matrix to be a rotation around the y-axis
		e[0] = Math.cos(radians); e[1] = 0; e[2] = Math.sin(radians); e[3] = 0;
		e[4] = 0; e[5] = 1; e[6] = 0; e[7] = 0;
		e[8] = -Math.sin(radians); e[9] = 0; e[10] = Math.cos(radians); e[11] = 0;
		e[12] = 0; e[13] = 0; e[14] = 0; e[15] = 1;

		return this;
	},

	// -------------------------------------------------------------------------
	makeRotationZ: function(degrees) {
		// todo - convert to radians
		var radians = degrees * (Math.PI/180);

		// shortcut - use in place of this.elements
		var e = this.elements;

		// todo - set every element of this matrix to be a rotation around the z-axis
		e[0] = Math.cos(radians); e[1] = -Math.sin(radians); e[2] = 0; e[3] = 0;
		e[4] = Math.sin(radians); e[5] = Math.cos(radians); e[6] = 0; e[7] = 0;
		e[8] = 0; e[9] = 0; e[10] = 1; e[11] = 0;
		e[12] = 0; e[13] = 0; e[14] = 0; e[15] = 1;

		return this;
	},

	// -------------------------------------------------------------------------
	makeTranslation: function(arg1, arg2, arg3) {
		// todo - wipe out the existing matrix and make it a pure translation
		//      - If arg1 is a Vector3 or Vector4, use its components and ignore
		//        arg2 and arg3. O.W., treat arg1 as x, arg2 as y, and arg3 as z
		var e = this.elements;

		if (arg1 instanceof Vector4) {
			e[0] = 1; e[1] = 0; e[2] = 0; e[3] = arg1.x;
			e[4] = 0; e[5] = 1; e[6] = 0; e[7] = arg1.y;
			e[8] = 0; e[9] = 0; e[10] = 1; e[11] = arg1.z;
			e[12] = 0; e[13] = 0; e[14] = 0; e[15] = arg1.w;
		} else if (arg1 instanceof Vector3) {
			e[0] = 1; e[1] = 0; e[2] = 0; e[3] = arg1.x;
			e[4] = 0; e[5] = 1; e[6] = 0; e[7] = arg1.y;
			e[8] = 0; e[9] = 0; e[10] = 1; e[11] = arg1.z;
			e[12] = 0; e[13] = 0; e[14] = 0; e[15] = 1;
		} else {
			e[0] = 1; e[1] = 0; e[2] = 0; e[3] = arg1;
			e[4] = 0; e[5] = 1; e[6] = 0; e[7] = arg2;
			e[8] = 0; e[9] = 0; e[10] = 1; e[11] = arg3;
			e[12] = 0; e[13] = 0; e[14] = 0; e[15] = 1;
		}
		// this.set(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15]);

		return this;
	},

	// -------------------------------------------------------------------------
	makePerspective: function(fovy, aspect, near, far) {
		        // todo -compute t (top) and r (right)
        // shortcut - use in place of this.elements
        var e = this.elements;
        // todo - set every element to the appropriate value
        e[0] = near/aspect ; e[1] = 0; e[2] = 0; e[3] = 0;
        e[4] = 0; e[5] = near/1 ; e[6] = 0; e[7] = 0;
        e[8] = 0; e[9] = 0; e[10] = -1 * ((far+near)/(far-near)); e[11] = -1 *((2*(near*far))/(far-near));
        e[12] = 0; e[13] = 0; e[14] = -1; e[15] = 0;
        return this;
	},

	// -------------------------------------------------------------------------
	makeOrthographic: function(left, right, top, bottom, near, far) {
		var e = this.elements;
        // todo - set every element to the appropriate value
        e[0] = 2/(right-left); e[1] = 0; e[2] = 0; e[3] = (-1*(right+left))/(right-left);
        e[4] = 0; e[5] = 2/(top-bottom); e[6] = 0; e[7] = (-1*(top+bottom))/(top-bottom);
        e[8] = 0; e[9] = 0; e[10] = -2/(far-near); e[11] = (-1*(far+near))/(far-near);
        e[12] = 0; e[13] = 0; e[14] = 0; e[15] = 1;
        return this;


	},

	// -------------------------------------------------------------------------
	// @param moonRotationAngle A scalar value representing the rotation angle around Earth
	// @param moonOffsetFromEarth A Vector3 representing the space between the earth and the moon
	// @param earthWorldMatrix The world transformation of the Earth composed of both rotation and translation
	createMoonMatrix: function(moonRotationAngle, offsetFromEarth, earthWorldMatrix) {

		// todo - create the world matrix for the moon given the supplied function arguments.
		//        See "Application - Earth & Moon" under lecture

		// Note: Do NOT change earthWorldMatrix but do use it, it already contains the rotation and translation for the earth

		var moonMatrix = new Matrix4();

		// todo - create and combine all necessary matrices necessary to achieve the desired effect

		return moonMatrix;
	},

	// -------------------------------------------------------------------------
	determinant: function() {
		var e = this.elements;

		// laid out for clarity, not performance
		var m11 = e[0]; var m12 = e[1]; var m13 = e[2]; var m14 = e[3];
		var m21 = e[4]; var m22 = e[5]; var m23 = e[6]; var m24 = e[7];
		var m31 = e[8]; var m32 = e[8]; var m33 = e[9]; var m34 = e[10];
		var m41 = e[12]; var m42 = e[13]; var m43 = e[14]; var m44 = e[15];

		var det11 = m11 * (m22 * (m33 * m44 - m34 * m43) +
			m23 * (m34 * m42 - m32 * m44) +
			m24 * (m32 * m43 - m33 * m42));

		var det12 = -m12 * (m21 * (m33 * m44 - m34 * m43) +
			m23 * (m34 * m41 - m31 * m44) +
			m24 * (m31 * m43 - m33 * m41));

		var det13 = m13 * (m21 * (m32 * m44 - m34 * m42) +
			m22 * (m34 * m41 - m31 * m44) +
			m24 * (m31 * m42 - m32 * m41));

		var det14 = -m14 * (m21 * (m32 * m43 - m33 * m42) +
			m22 * (m33 * m41 - m31 * m43) +
			m23 * (m31 * m42 - m32 * m41));

		return det11 + det12 + det13 + det14;
	},

	// -------------------------------------------------------------------------
	transpose: function() {
		var te = this.elements;
		var tmp;

		tmp = te[1]; te[1] = te[4]; te[4] = tmp;
		tmp = te[2]; te[2] = te[8]; te[8] = tmp;
		tmp = te[6]; te[6] = te[9]; te[9] = tmp;

		tmp = te[3]; te[3] = te[12]; te[12] = tmp;
		tmp = te[7]; te[7] = te[13]; te[13] = tmp;
		tmp = te[11]; te[11] = te[14]; te[14] = tmp;

		return this;
	},


	// -------------------------------------------------------------------------
	inverse: function() {
		// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
		var te = this.elements,
			me = this.clone().elements,

			n11 = me[0], n21 = me[1], n31 = me[2], n41 = me[3],
			n12 = me[4], n22 = me[5], n32 = me[6], n42 = me[7],
			n13 = me[8], n23 = me[9], n33 = me[10], n43 = me[11],
			n14 = me[12], n24 = me[13], n34 = me[14], n44 = me[15],

			t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
			t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
			t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
			t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

		var det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

		if (det === 0) {
			var msg = "can't invert matrix, determinant is 0";
			console.warn(msg);
			return this.makeIdentity();
		}

		var detInv = 1 / det;

		te[0] = t11 * detInv;
		te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
		te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
		te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;

		te[4] = t12 * detInv;
		te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
		te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
		te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;

		te[8] = t13 * detInv;
		te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
		te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
		te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;

		te[12] = t14 * detInv;
		te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
		te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
		te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;

		return this;
	},

	// -------------------------------------------------------------------------
	log: function() {
		var te = this.elements;
		console.log('[ ' +
			'\n ' + te[0] + ', ' + te[1] + ', ' + te[2] + ', ' + te[3] +
			'\n ' + te[4] + ', ' + te[5] + ', ' + te[6] + ', ' + te[7] +
			'\n ' + te[8] + ', ' + te[9] + ', ' + te[10] + ', ' + te[11] +
			'\n ' + te[12] + ', ' + te[13] + ', ' + te[14] + ', ' + te[15] +
			'\n]'
		);

		return this;
	}
};

// EOF 00100001-10