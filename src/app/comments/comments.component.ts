import { Component, OnInit, Input } from '@angular/core';
import { Comment } from './comment/comment.model';
import { CommentService } from './comment/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
	providers: [CommentService]
})
export class CommentsComponent implements OnInit {

	@Input() eventId: number;
	private comments: Comment[];

  constructor(private commentService: CommentService) { }

  ngOnInit() {
  	this.getComments();
  }

  getComments(): void {
  	this.commentService.getComments(this.eventId)
  		.then(comments => this.comments = comments)
  }

  addComment(comment: Comment): void {
    this.comments.push(comment);
  }

  removeComment(id: number): void {
    this.comments = this.comments.filter(comment => comment.id != id);
  }
}
