export class Promotor {
    _id = '';
    name = '';
    username = '';
    phone = '';
    password = '';
    note = '';
    events: Evento[] = [];
    permissions: any = {};
}

export class Puerta {
    _id = '';
    name = '';
    username = '';
    phone = '';
    password = '';
    note = '';
    event: Evento = new Evento();
}

export class Box {
    name = '';
    banner = '';
    capacity = 0;
}

export class Invitado {
    _id: string;
    name = '';
    promotor: any;
    fechaIngreso: string;
    fecha: string;
    date: string;
}

export class Evento {
    _id = '';
    name = '';
    date = '';
    time = '';
    promotores: Promotor[] = [];
    puertas: Promotor[] = [];
    banner = '';
    details = [];
    note = '';
    boxes: Box[] = [];
    invitados: Invitado[] = [];
    asistentes = 0;
    asistentesPercentage = 0;
    boxesDisponibles = 0;
    boxesmap = '';
    timeLimit = '';
    allowInvitadosAfterStarted = false;
}

export class PermisosPorEvento {
    maxInvitados = 100;
    boxes = false;
    maxBoxes = 0;
    allowInvitadosAfterEventStarted = false;
}
