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

}