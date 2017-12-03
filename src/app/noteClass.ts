export class noteClass{
	notetext:string;
	noteid:string;

	constructor(text,id){
		this.notetext=text;
		this.noteid= id;
	}

	getnoteText(){
		return this.notetext;
	}

	setNoteText(value:string){
		this.notetext=value;
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