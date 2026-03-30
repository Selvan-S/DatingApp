using System.Security.Claims;
using API.DTOs;
using API.Entities;
using API.Extensions;
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

    [HttpPut] // PUT api/members
    public async Task<ActionResult> UpdateMember(MemberUpdateDto memberUpdateDto)
    {
        var memberId = User.GetMemberId();

        var member = await memberRepository.GetMemberForUpdateAsync(memberId);

        if (member == null) return NotFound("Member not found");

        member.DisplayName = memberUpdateDto.DisplayName ?? member.DisplayName;
        member.Description = memberUpdateDto.Description ?? member.Description;
        member.City = memberUpdateDto.City ?? member.City;
        member.Country = memberUpdateDto.Country ?? member.Country;

        member.User.DisplayName = memberUpdateDto.DisplayName ?? member.User.DisplayName;

        // memberRepository.Update(member); // No need to call Update since we're tracking the entity

        if (await memberRepository.saveAllAsync()) return NoContent();

        return BadRequest("Failed to update profile");
    }

}
