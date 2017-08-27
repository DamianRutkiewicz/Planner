export class noteClass{
	noteText:string;

	constructor(){
		this.noteText="lorem ipsum";
	}

	getnoteText(){
		return this.noteText;
	}

	setNoteText(value:string){
		this.noteText=value;
	}

	// getTopStr(){
	// 	return this.top+"px";
	// }
	// getTop(){
	// 	return this.top;
	// }
	// setTop(value:number){
	// 	this.top=value;
	// }
	// getLeftStr(){
	// 	return this.left+"px";
	// }
	// getLeft(){
	// 	return this.left;		
	// }
	// setLeft(value:number){
	// 	this.left=value;
	// }

}