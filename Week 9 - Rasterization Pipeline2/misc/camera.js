function Camera(input) {
    // The following two parameters will be used to automatically create the cameraWorldMatrix in this.update()
    this.cameraYaw = 0;
    this.cameraPosition = new Vector3();

    this.cameraWorldMatrix = new Matrix4();

    // -------------------------------------------------------------------------
    this.getViewMatrix = function() {
        return this.cameraWorldMatrix.clone().inverse();
    }

    // -------------------------------------------------------------------------
    this.getForward = function() {
        // todo #6 - pull out the forward direction from the world matrix and return as a vector
        //         - recall that the camera looks in the "backwards" direction

        var e = this.cameraWorldMatrix.elements;

        return new Vector3(e[3], e[7], e[15]).multiplyScalar(-1);
    }
    // -------------------------------------------------------------------------
    this.update = function(dt) {
        var currentForward = this.getForward();

        if (input.up) {
            // todo #7 - move the camera position a little bit in its forward direction
            //this.cameraPosition = this.cameraPosition.subtract(currentForward.clone().normalize());
            this.cameraPosition = this.cameraPosition.add(currentForward.clone().normalize())//.multiplyScalar(.8,.8,.8);
        }

        if (input.down) {
            // todo #7 - move the camera position a little bit in its backward direction
            //this.cameraPosition = this.cameraPosition.add(currentForward.clone().normalize());
            this.cameraPosition = this.cameraPosition.subtract(currentForward.clone().normalize())//.multiplyScalar(.8,.8,.8);
        }

        if (input.left) {
            // todo #8 - add a little bit to the current camera yaw
            this.cameraYaw = this.cameraYaw + .9;
        }

        if (input.right) {
            // todo #8 - subtract a little bit from the current camera yaw
            this.cameraYaw = this.cameraYaw - .9;
        }

        // todo #7 - create the cameraWorldMatrix from scratch based on this.cameraPosition

        
        //this.cameraWorldMatrix.makeTranslation(this.cameraPosition).multiply(new Matrix4().makeRotationY(90));
        if (input.up || input.down)
        {
            this.cameraWorldMatrix.makeTranslation(this.cameraPosition);
        }
        if (input.left || input.right)
        {
            this.cameraWorldMatrix.makeRotationY(this.cameraYaw).multiply(new Matrix4().makeTranslation(this.cameraPosition));
            //this.cameraWorldMatrix.makeTranslation(this.cameraPosition).multiply(new Matrix4().makeRotationY(this.cameraYaw));
        }
        
        
        // makeTranslation(this.cameraPosition)

        // todo #8 - create a rotation matrix based on cameraYaw and apply it to the cameraWorldMatrix
        // (order matters!)
    }
}