using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class MembersController(IMemberRepository memberRepository) : BaseApiController
{

    [HttpGet] // GET api/members
    public async Task<ActionResult<IReadOnlyList<Member>>> GetMembers()
    {
        return Ok(await memberRepository.GetMembersAsync());
    }

    [HttpGet("{id}")] // GET api/members/5
    public async Task<ActionResult<IEnumerable<Member>>> GetMember(string id)
    {
        var member = await memberRepository.GetMemberByIdAsync(id);

        if (member == null) return NotFound("Member not found");

        return Ok(member);
    }

    [HttpGet("{id}/photos")] // GET api/members/5/photos
    public async Task<ActionResult<IEnumerable<Photo>>> GetPhotosForMember(string id)
    {
        var photos = await memberRepository.GetPhotosForMemberAsync(id);

        if (photos == null) return NotFound("Photos not found");

        return Ok(photos);
    }

}
