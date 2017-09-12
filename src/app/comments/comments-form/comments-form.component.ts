import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CommentService } from '../comment/comment.service';
import { AlertService } from '../../alert/alert.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.scss']
})
export class CommentsFormComponent implements OnInit {

	@Input() content: string;
	@Input() eventId: number;
  @Output() newComment = new EventEmitter<Comment>();

  constructor(
    private commentService: CommentService, 
    private alertService: AlertService,
    private authService: AuthService
   ) { }

  ngOnInit() {
  	if(this.content === undefined) {
  		this.content = "";
  	}
  }

  submitComment() {
  	this.commentService.submitComment(this.content, this.eventId)
      .then(res => {
        this.alertService.show(res.message);
        const comment: Comment = res.data;
        this.newComment.emit(comment);
        this.content = "";
      })
  }
}
