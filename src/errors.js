export class DuplicateUserEmailError extends Error{
    errorCode = "U001";

    constructor(reason, data){
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class InvalidScoreError  extends Error{
    errorCode = "R001";

    constructor(reason, data){
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class UserNotFoundError extends Error{
    errorCode = "R002";

    constructor(reason, data){
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class StoreNotFoundError extends Error{
    errorCode = "R003";

    constructor(reason, data){
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class MissionNotFoundError extends Error{
    errorCode = "M001";

    constructor(reason, data){
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class MissionStoreMismatchError extends Error{
    errorCode = "M002";

    constructor(reason, data){
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class MissionAlreadyInProgressError extends Error{
    errorCode = "M003";

    constructor(reason, data){
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}



