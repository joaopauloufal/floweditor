var lib = require('../../node_modules/jsplumb/dist/js/jsplumb.js');
import {FlowDefinition} from '../services/FlowStore';
import {ExitProps} from '../interfaces';

export interface DragEvent {
    el: Element
    pos: number[]
    finalPos: number[]
    e: MouseEvent
}

export class Plumber {

    public jsPlumb: any;

    private static singleton: Plumber = new Plumber();

    static get(): Plumber {
        return Plumber.singleton;
    }

    targetDefaults = {
        anchor: [ "Continuous", { faces:["top", "left", "right"] }],
        endpoint: [ "Rectangle", { width: 20, height: 20, hoverClass: 'endpoint-hover' }],
        hoverClass: 'target-hover',
        dropOptions: { tolerance:"touch", hoverClass:"drop-hover" },
        dragAllowedWhenFull: false,
        deleteEndpointsOnDetach: true,
        isTarget:true,
    }

    sourceDefaults = {
        anchor: "BottomCenter",
        deleteEndpointsOnDetach: true,
        maxConnections:1,
        dragAllowedWhenFull:false,
        isSource:true,
        paintStyle: { fillStyle:"blue", outlineColor:"black", outlineWidth:1 }
    }

    private constructor() {
        this.jsPlumb = lib.jsPlumb.importDefaults({
            DragOptions : { cursor: 'pointer', zIndex:2000 },
            DropOptions : { tolerance:"touch", hoverClass:"drop-hover" },
            Endpoint: "Blank",
            EndpointStyle: { strokeStyle: "transparent" },
            PaintStyle: { strokeWidth:5, stroke:"#98C0D9" },
            HoverPaintStyle: { strokeStyle: "#27ae60"},
            HoverClass: "connector-hover",
            ConnectionsDetachable: true,
            Connector:[ "Flowchart", { stub: 12, midpoint: .85, alwaysRespectStubs: false, gap:[0,7], cornerRadius: 2 }],
            ConnectionOverlays : [["PlainArrow", { location:.9999, width: 12, length:12, foldback: 1 }]],
            Container: "flow"
        });
    }

    /*draggable(ele: JSX.Element) {
        this.jsPlumb.draggable(ele);
    }*/
    
    draggable(ele: JSX.Element, start: Function, drag: Function, stop: Function) {
        this.jsPlumb.draggable(ele, {
            start: (event:any) => start(event),
            drag: (event: DragEvent) => drag(event),
            stop: (event: DragEvent) => stop(event),
        })
    }

    makeSource(uuid: string) {
        this.jsPlumb.makeSource(uuid, this.sourceDefaults);
    }

    makeTarget(uuid: string) {
        this.jsPlumb.makeTarget(uuid, this.targetDefaults);
    }

    detach(uuid: string) {
        this.jsPlumb.detachAllConnections(uuid);
    }

    connectExit(exit: ExitProps) {
        this.connect(exit.uuid, exit.destination);
    }

    connect(source: string, target: string) {
        if (source != null && target != null) {
            // console.log(source, '=>', target);
            this.jsPlumb.connect({source: source, target: target, fireEvent: false});
        }
    }

    bind(event: string, onEvent: Function){
        return this.jsPlumb.bind(event, onEvent);
    }

    repaint(uuid: string) {
        window.setTimeout(()=>{
            this.jsPlumb.recalculateOffsets(uuid);
            this.jsPlumb.repaint(uuid);
        }, 0);
    }

    reset() {
        this.jsPlumb.detachEveryConnection();
    }

    connectAll(flow: FlowDefinition) {
        console.log('Reconnecting plumbing..');
        
        // this will suspend drawing until all nodes are connected
        this.jsPlumb.ready(() => {
            this.jsPlumb.batch(()=> {
                this.reset();
                // wire everything up
                for (let node of flow.nodes) {
                    if (node.exits) {
                        for (let exit of node.exits) {
                            this.connect(exit.uuid, exit.destination);
                        }
                    }
                }                
            })

            // after initial connections, force a repaint
            this.jsPlumb.repaintEverything();
        });
    }
}

export default Plumber;